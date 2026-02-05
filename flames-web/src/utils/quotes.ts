import type { FlamesResult } from "./flames";

// Pseudo-random number generator based on string seed
const getHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// 20 unique hilarious quotes for each FLAMES result
const FUNNY_QUOTES: Record<FlamesResult, string[]> = {
    Friends: [
        "Achievement unlocked: the legendary 'partner in crime' friendship package! 🎮",
        "Congrats! You've unlocked the ultimate 'ride or die' bond. No refunds! 😎",
        "Your vibe check returned: the rare '3 AM call' privilege connection. Terms and conditions apply. 🤝",
        "Breaking news: You two have been certified as 'weird together' soulmates! Side effects: constant laughter. 😂",
        "Friendship level: MAXIMUM! Warning: may cause unlimited chaos and inside jokes! 🎉",
        "The cosmic BFF detector found: Premium 'meme sharing' subscription. Cancel? Never! 🌟",
        "Plot twist: You're officially each other's 'bad decisions together' consultant! 🚀",
        "Status update: Infinite 'embarrassing stories' membership activated. Perks: blackmail material! 🤣",
        "Warning: Sacred 'Netflix binge' alliance detected. Prepare for adventure! 🏆",
        "The universe says: You two are the definition of 'food stealing' friendship! Let the shenanigans begin! 🎭",
        "Friendship.exe has loaded successfully! Error 404: Personal space not found! 😄",
        "Congratulations! You've been assigned as each other's designated 'hype person' for life! 📣",
        "Alert: Mutual 'finish each other's sentences' ability unlocked! Creepy? Maybe. Cool? Definitely! 🎪",
        "Your friendship compatibility: 100%! Side effects include matching outfits and synchronized eye rolls! 👯",
        "Breaking: You two share one brain cell and it's on vacation! But that's what makes it perfect! 🧠",
        "Achievement: 'Know all the tea' status achieved! Your secrets are safe... probably! ☕",
        "Friendship forecast: 99% chance of spontaneous adventures and 100% chance of regrettable decisions! 🌈",
        "Certified 'laugh at the same dumb things' partners! Intelligence level: questionable. Fun level: off the charts! 🎨",
        "You've unlocked: Lifetime supply of 'remember that time when...' stories! Storage space: unlimited! 📚",
        "The stars confirm: You're each other's 'I'll help you hide the body' person! (Legally speaking, that's friendship goals!) 🌟"
    ],
    Lovers: [
        "Smooth operator alert! Netflix called, they want to make a rom-com! 💕",
        "Cupid just texted: 'You two are giving main character energy!' Love story incoming! 😍",
        "Love potion #9 detected! Someone call 911 because this is a five-alarm romance! 🔥",
        "Heart rate: CRITICAL! Warning: dangerously high levels of chemistry! ⚡",
        "Romance.exe is loading: The stars are shipping this passionate connection! 💖",
        "Butterflies deployed: Disney is taking notes on this fairy tale romance! ✨",
        "The pickup line gods approve: This is the definition of pure, unfiltered love! 💘",
        "Heartbeat sync: 100%! Poets are crying over this epic love saga! 🌹",
        "Love radar beeping: The universe is blushing at this heart-melting romance! 💗",
        "Roses are red, violets are blue, Hallmark movies could never match this, and honestly? We're jealous! 😏",
        "Breaking: Local couple too cute, authorities have been notified! Proceed with extreme PDA! 💑",
        "Love level: LEGENDARY! Side effects include constant smiling and forgetting other people exist! 😊",
        "The universe just shipped you two HARD! Estimated delivery: happily ever after! 📦💝",
        "Warning: Excessive heart eyes detected! May cause friends to gag from sweetness overload! 😍",
        "Congratulations! You've won the romantic lottery! Prize: unlimited butterflies and stolen glances! 🎰",
        "Alert: Chemistry levels off the charts! Scientists are baffled, romantics are inspired! 🔬💕",
        "Your love story just made Cupid retire. He said 'My work here is done!' 🏹",
        "Breaking news: Two hearts decided to become one! No survivors from the cuteness! 💖",
        "The stars aligned, the moon smiled, and fate said 'YESSS!' This is IT! ✨",
        "Love compatibility: INFINITE! Warning: May cause spontaneous poetry writing and stargazing! 🌙"
    ],
    Affectionate: [
        "Aww, how cute! You two radiate 'forehead kisses and hand-holding' energy! 🥰",
        "Sweet alert: This screams 'sharing hoodies and playlists' vibes! So precious! 💝",
        "Adorable vibes detected: Major 'good morning texts' potential! Handle with care! 🌸",
        "Soft launch incoming: Peak 'remembering little details' moments ahead! 💫",
        "Wholesome content warning: Ultimate 'comfortable silence' connection! Diabetes warning! 🍭",
        "The cuteness meter broke: Premium 'stealing glances' chemistry! Too sweet! 🧁",
        "Warm fuzzy feelings: Certified 'blushing around each other' attraction! Proceed gently! 🦋",
        "Sugar rush detected: Official 'thinking about you' affection! Heart eyes activated! 😊",
        "Gentle reminder: Exclusive 'butterflies in stomach' fondness! Aww overload! 💕",
        "Soft boi/girl energy: Legendary 'soft smiles' feels! Cuteness level: maximum! 🌺",
        "Aww-ometer reading: CRITICAL! You two are the definition of 'couple goals' but make it soft! 🌸",
        "Warning: Excessive wholesomeness detected! Side effects include warm hearts and happy sighs! ☁️",
        "The universe just said 'awww' out loud! This is too pure for this world! 🌈",
        "Sweetness level: MAXIMUM! Dentists hate this one simple trick: your adorable connection! 🍬",
        "Alert: You two have unlocked the 'makes everyone believe in love' achievement! 💖",
        "Cuteness overload in progress! Please stand by while we collect our hearts from the floor! 🥺",
        "Your vibe: Cozy coffee dates and sunset walks! Aesthetic level: Pinterest board worthy! ☕",
        "Breaking: Local couple too wholesome, spreading joy wherever they go! 🌻",
        "The stars are literally making heart shapes! This is the softest timeline! 💗",
        "Affection forecast: 100% chance of gentle touches and meaningful eye contact! 🌙"
    ],
    Marriage: [
        "ABORT MISSION! No one can save you now from this inevitable marriage! 💍😱",
        "Red alert! Code RED! Your freedom has left the chat for this matrimonial destiny! RIP freedom! 💒",
        "The universe screams: The wedding bells are ringing for this eternal union! No escape! 👰🤵",
        "Plot twist of the century: The in-laws are already planning this sacred bond! Your doom is sealed! 💐",
        "Breaking: Local person's bachelor/bachelorette days are numbered! Say goodbye to the boys/girls! 🎊",
        "Emergency broadcast: Joint bank accounts incoming for this wedding extravaganza! Hope you like cake! 🎂",
        "Fate has spoken: 'Till death do us part' vibes in this lifetime commitment! No backsies! 💑",
        "The prophecy is clear: The ring is already being sized for this marital bliss! (Terms and conditions apply) 📜",
        "Destiny called, it said: Your single friends are crying about this happily ever after! *nervous laughter* 😅",
        "WARNING: Point of no return - You're legally required to attend this permanent partnership! You've been warned! ⚠️",
        "MAYDAY! MAYDAY! The wedding planners have been deployed! There's no turning back now! 🚨",
        "Breaking news: Your Netflix password is about to become 'our' Netflix password! The horror! 📺",
        "Alert: Someone's about to lose the TV remote forever! Marriage = ultimate sacrifice! 🎮",
        "The universe has spoken: Time to adult HARD! Joint tax returns incoming! 💸",
        "Congratulations! You've unlocked the 'argue about what to have for dinner' achievement! Forever! 🍕",
        "Warning: Your bed is about to be permanently occupied by someone who steals the blankets! 🛏️",
        "Fate sealed: You're about to discover what 'for better or worse' REALLY means! Good luck! 🎰",
        "Breaking: Local person about to find out that 'I do' means 'I do the dishes too!' 🧽",
        "The stars align for: Matching couple outfits and finishing each other's... sandwiches! 👕",
        "Emergency: Your freedom has filed for bankruptcy! But hey, you get a plus-one for life! 🎉"
    ],
    Enemies: [
        "YIKES! Danger zone! You two have 'argue about everything' energy! Keep distance! ⚔️",
        "Oof. This is awkward. Major 'can't stand each other' vibes! Yikes on bikes! 😬",
        "The drama detector is OFF THE CHARTS: Peak 'passive aggressive texts' potential! Evacuate immediately! 🚨",
        "Spicy take incoming: Ultimate 'eye rolling' chemistry! (The explosive kind) 💥",
        "Chaos energy detected: Legendary 'who asked you?' rivalry! May the odds be ever in your favor! 🎯",
        "Red flags everywhere: Premium 'stay away from me' tension! Popcorn ready! 🍿",
        "The beef is REAL: Certified 'we have beef' conflict! Jerry Springer called! 📺",
        "Tension level: MAXIMUM! Official 'blocked and reported' hostility! Peace was never an option! ⚡",
        "Fight club vibes: Exclusive 'not on speaking terms' opposition! Choose your fighter! 🥊",
        "The universe says 'RUN': Maximum 'choose violence' warfare! Survival mode activated! 🔥",
        "WARNING: Oil and water have better chemistry than you two! Proceed with caution! ⚠️",
        "Breaking: Local rivals spotted! Witnesses report 'could cut the tension with a knife' vibes! 🔪",
        "Alert: You two are the definition of 'it's on sight!' Energy level: HOSTILE! 👊",
        "The stars predict: Epic showdowns and legendary comebacks! May the best roast win! 🎤",
        "Danger level: CRITICAL! You two together = instant drama! Someone call security! 🚔",
        "Breaking news: Local enemies refuse to be in the same room! The pettiness is REAL! 😤",
        "Your compatibility: -100%! Side effects include eye twitching and aggressive sighs! 😒",
        "The universe is placing bets on who snaps first! Smart money says: both of you! 💰",
        "Alert: Toxic energy detected! Recommended distance: different zip codes! 🗺️",
        "Congratulations! You've unlocked the 'mutual disdain' achievement! Yay...? 🏆"
    ],
    Siblings: [
        "Sweet home Alabama? Nah, just You two radiate 'annoying each other 24/7' sibling bond! 👫",
        "Family reunion vibes: Major 'stealing food from the fridge' brother/sister energy! No romance here! 🙅",
        "The DNA test came back: Peak 'telling on each other' family vibes! Keep it wholesome! 🏠",
        "Sibling energy STRONG: Ultimate 'borrowing without asking' kinship! Thanksgiving dinner awaits! 🦃",
        "Mom said it's my turn: Legendary 'fighting over the remote' platonic connection! Friend-zoned by genetics! 🧬",
        "The family tree confirms: Premium 'embarrassing each other in public' household chaos! Mom's favorite? Debatable! 👨‍👩‍👧‍👦",
        "Childhood trauma shared: Certified 'knowing all the secrets' sibling rivalry! Player 2 has entered! 🎮",
        "Matching genes detected: Official 'roasting but loving' family ties! Can't escape blood! 💉",
        "Brother/Sister from another mister? Exclusive 'ride or die (but mostly die)' fraternal feels! Alabama jokes incoming! 🌾",
        "The bloodline speaks: Maximum 'chaotic but loyal' genetic friendship! DNA said 'nope' to romance! 🔬",
        "Breaking: You two share the same 'Mom said it's MY turn on the Xbox' energy! 🎮",
        "Alert: Sibling rivalry detected! Symptoms include: tattling, stealing clothes, and unconditional love! 👕",
        "The universe confirms: You're stuck with each other at every family gathering! Forever! 🎄",
        "Warning: Matching childhood trauma detected! Therapy sessions: recommended! 🛋️",
        "Congratulations! You've unlocked the 'annoy each other but defend each other' paradox! 🛡️",
        "Family vibes: 100%! You two invented the concept of 'I can bully them but YOU can't!' 👊",
        "Breaking news: Local siblings caught being nice to each other! Witnesses shocked! 😱",
        "The stars say: You two will fight over the last slice of pizza until the end of time! 🍕",
        "Alert: You share the same 'survived the same parents' bond! That's powerful stuff! 💪",
        "Your connection: Platonic AF! Romance level: ZERO! Family BBQ attendance: MANDATORY! 🌭"
    ]
};

export const getDynamicQuote = (name1: string, name2: string, result: FlamesResult): string => {
    // 1. Create a deterministic seed from the names
    const sortedNames = [name1.toLowerCase().trim(), name2.toLowerCase().trim()].sort().join("");
    const seed = getHash(sortedNames);
    
    // 2. Get quotes array for the result
    const quotes = FUNNY_QUOTES[result];
    
    // 3. Select a quote based on seed (deterministic but appears random)
    const quoteIndex = seed % quotes.length;
    
    return quotes[quoteIndex];
};
