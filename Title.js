// This object will store users' titles temporarily. Replace this with a database in production.

const userTitles = {};
function setUserTitle(userId, title) {
    userTitles[userId] = title;
}
function getUserTitle(userId) {
    return userTitles[userId] || "None"; 
}
const { checkVipUser } = require('./lib/vipem');
const moment = require('moment-timezone');
function setLifetimeVip(userId) {
    // Find the user in VIP data and set their status to "lifetime" if they have the "Mythical" title
    const userIndex = vipmem.findIndex(member => member.id === userId);
    if (userIndex > -1) {
        vipmem[userIndex].expired = "lifetime";
    } else {
        vipmem.push({ id: userId, expired: "lifetime" }); // Add as lifetime VIP if not already present
    }
}

const vipahmantur = moment.tz('Asia/Kolkata');
let vipmem;
try {
    const ftcvip = await fetch("https://raw.githubusercontent.com/HBMods-OFC/VipData/master/VIP/vip-pro.json");
    vipmem = await ftcvip.json();
} catch (error) {
    console.error("Failed to fetch VIP data:", error);
    vipmem = []; 
}
const isVip = checkVipUser(m.sender, vipmem);
const currentTitle = getUserTitle(m.sender);
if (currentTitle === "Mythical") {
    setLifetimeVip(m.sender); 
}
const isExp = vipmem.some((member) => {
    if (member.id === m.sender && member.expired !== "lifetime") {
        const expirationDate = moment(member.expired, 'YYYY-MM-DD');
        return vipahmantur.isAfter(expirationDate);
    }
    return false;
});



case `${prefixc}` + 'myinfo': {
    if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender);
    const user = m.sender;
    const freevip = "frvip"; 
    const cara = "cara";

    const balance = await eco.balance(user, cara);
    const balance2 = await eco.balance(limitneihtu, khawlbawm);
    const balance3 = await eco.balance(limitneihtu, freevip);
    const userTitle = getUserTitle(user);  // Fetch user's current title

    const buffx = await fs.readFileSync('./asset/image/info.png');
    const isVip = checkVipUser(m.sender, vipmem);
    const vipUser = vipmem.find((member) => member.id === m.sender);
    const isLifetime = vipUser && vipUser.expired === "lifetime";
    const isExp = vipUser && vipUser.expired !== "lifetime" && vipahmantur.isAfter(moment(vipUser.expired, 'YYYY-MM-DD'));

    if (!isVip) {
        return HBWABotMz.sendMessage(from, { image: buffx, caption: `
> *INFO BY ${pushname}*
> *💎 Limit Status :* ${balance2.wallet}
> *🪙 Coin Status :* ${balance.wallet}
> *🎟️ VIP Trial :* ${balance3.wallet} left
> *👑 VIP Status :* 🔴 Not Active
> *🎖️ Title :* ${userTitle}`
        }, { quoted: m });
    }

    await HBWABotMz.sendMessage(from, { image: buffx, caption: `
> *INFO BY ${pushname}*
> *💎 Limit Status :* ${balance2.wallet}
> *🪙 Coin Status :* ${balance.wallet}
> *👑 VIP Status :* 🟢 Active
> *🕡 VIP Expiry :* ${isLifetime ? "Lifetime VIP" : isExp ? "Expired" : vipUser.expired}
> *🎖️ Title :* ${userTitle}`
    }, { quoted: m });
}
break;


case `${prefixc}` + 'title-upgrade': {
    HBWABotMz.sendMessage(from, { react: { text: "🎖️", key: m.key } });
    const user = m.sender;
    const cara = "cara";
    const balance = await eco.balance(user, cara);
    const currentTitle = getUserTitle(user);
    const titles = [
        { name: "Elite", requiredBalance: 50000 },
        { name: "Master", requiredBalance: 100000 },
        { name: "Grand Master", requiredBalance: 200000 },
        { name: "Epic", requiredBalance: 300000 },
        { name: "Lord", requiredBalance: 450000 },
        { name: "Mythical", requiredBalance: 600000 }
    ];
    async function upgradeTitle(newTitle, cost) {
        if (balance.wallet < cost) {
            return dodoi(`I title hi "${newTitle}" a upgrade tur chuan coins ${cost} i neih tlin ngei ngei a ngai`);
        }
        await eco.deduct(user, cara, cost);
        setUserTitle(user, newTitle);  // Assign the new title
        // Check if the new title is "Mythical" and grant lifetime VIP if so
        if (newTitle === "Mythical") {
            vipmem.push({ id: user, expired: "lifetime" }); 
            await dodoi(`Kan lawmpui a che! "Mythical" title i nei tawh a, tunah chuan lifetime VIP Member i ni tawh!`);
        } else {
            await dodoi(`Kan lawmpui che! "${newTitle}" ah i upgrade tawh. I title thar chu "myinfo" hmangin check rawh.`);
        }
    }
    // Step-by-step upgrade logic based on current title
    if (currentTitle === "None" || currentTitle === "Elite") {
        if (balance.wallet >= 50000) {
            await upgradeTitle("Elite", 50000);  // Upgrade to Elite first
        } else {
            return dodoi(`"Elite" title-a upgrade tur chuan coin 50000 tal i mamawh a ni.`);
        }
    } else if (currentTitle === "Master") {
        if (balance.wallet >= 100000) {
            await upgradeTitle("Master", 100000);  // Upgrade to Master
        } else {
            return dodoi(`"Master" title-a upgrade tur chuan coin 100000 tal i mamawh a ni.`);
        }
    } else if (currentTitle === "Grand Master") {
        if (balance.wallet >= 200000) {
            await upgradeTitle("Grand Master", 200000);  // Upgrade to Grand Master
        } else {
            return dodoi(`"Grand Master" title-a upgrade tur chuan coin 200000 tal i mamawh a ni.`);
        }
    } else if (currentTitle === "Epic") {
        if (balance.wallet >= 300000) {
            await upgradeTitle("Epic", 300000);  // Upgrade to Epic
        } else {
            return dodoi(`"Epic" title-a upgrade tur chuan coin 300000 tal i mamawh a ni.`);
        }
    } else if (currentTitle === "Lord") {
        if (balance.wallet >= 450000) {
            await upgradeTitle("Lord", 450000);  // Upgrade to Lord
        } else {
            return dodoi(`"Lord" title-a upgrade tur chuan coin 450000 tal i mamawh a ni.`);
        }
    } else if (currentTitle === "Mythical") {
        return dodoi(`Title sang ber i nei tawh a: "Mythical". Upgrade dang a awm tawh lo.`);
    } else {
        return dodoi(`Upgrade belh tur chuan "Elite" title tal i neih a ngai a ni.`);
    }
}
break;
  
