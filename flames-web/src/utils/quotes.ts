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

// Combinatorial fragments for generating 1000+ unique quotes per category
const QUOTE_TEMPLATES: Record<FlamesResult, { openers: string[], middles: string[], endings: string[] }> = {
    Friends: {
        openers: [
            "The stars indicate", "Destiny has forged", "The universe sees", "Your paths align to create", "Fate has written",
            "A cosmic scan reveals", "The energies bind you as", "Your souls vibrate with", "The cards predict", "A deep resonance suggests"
        ],
        middles: [
            " an unbreakable bond of", " a pure and lasting", " a fun-filled journey of", " a supportive foundation of", " a lifetime of",
            " an incredibly strong", " a legendary alliance of", " a truly loyal", " a harmonious state of", " a radiant connection of"
        ],
        endings: [
            "true friendship.", "camaraderie and joy.", "mutual support and laughter.", "trust and endless talks.", "shared adventures.",
            "unwavering loyalty.", "companionship that never fades.", "memories waiting to be made.", "best-friend energy.", "spirit-bonding."
        ]
    },
    Lovers: {
        openers: [
            "Passion ignites as", "The heavens declare", "Your hearts beat to reveal", "A crimson thread connects you in", "The flames of destiny burn for",
            "Love is in the air, signaling", "The constellation of romance shines on", "Cupid's arrow points to", "A magnetic pull confirms", "The saga of your hearts begins with"
        ],
        middles: [
            " a deeply romantic", " an intense and fiery", " a soul-stirring", " a passionate and wild", " a beautiful, blossoming",
            " an enchanting tale of", " a breathtaking whirlwind of", " a destined journey of", " a profound and poetic", " an electrifying state of"
        ],
        endings: [
            "true love.", "romance.", "endless passion.", "heartfelt connection.", "romantic bliss.",
            "devotion and desire.", "love that defies time.", "sweetest intimacy.", "tender affection.", "amorous adventure."
        ]
    },
    Affectionate: {
        openers: [
            "A gentle warmth surrounds you,", "Soft whispers of fate speak of", "The moon beams upon", "Your auras blend into", "A sweet melody plays for",
            "Kindness flows between you like", "The gentle tide brings", "A soft glow reveals", "Tender vibes signal", "The comfort of destiny suggests"
        ],
        middles: [
            " a sweet and caring", " a deeply fond", " a warm and nurturing", " a delightful spark of", " a comforting sense of",
            " a protective and kind", " a lovely expression of", " a soft and gentle", " a heartwarming link of", " a charming bond of"
        ],
        endings: [
            "affection.", "fondness and care.", "sweet attraction.", "mutual admiration.", "gentle care.",
            "soft-hearted moments.", "adoration.", "warm fuzzies.", "delicate connection.", "cherished feelings."
        ]
    },
    Marriage: {
        openers: [
            "The stars align for eternity,", "The sacred bond is written,", "Destiny has chosen you for", "The ultimate union awaits,", "Heavenly bells ring for",
            "A golden path leads to", "Two souls are destined for", "The universe consecrates", "A divine plan orchestrates", "The prophecy foretells"
        ],
        middles: [
            " a lifetime of", " an eternal and sacred", " a destined and holy", " an unbreakable covenant of", " a harmonious and lasting",
            " a blissful journey of", " a divinely guided", " a solid and faithful", " a truly magical", " a prosperous and united"
        ],
        endings: [
            "marriage.", "wedded bliss.", "union forever.", "eternal partnership.", "holy matrimony.",
            "life together.", "husband and wife destiny.", "soulmate union.", "forever after.", "sacred vow."
        ]
    },
    Enemies: {
        openers: [
            "Storm clouds gather over", "The cosmos warns of", "Sparks fly, but they signal", "A clash of wills reveals", "Danger lies ahead in",
            "The energies collide creating", "Warning signs point to", "A battle of egos suggests", "The stars turn cold regarding", "Fate advises caution due to"
        ],
        middles: [
            " a chaotic and fierce", " a turbulent storm of", " a sharp and cutting", " a challenging rivalry of", " an intense conflict of",
            " a bitter and cold", " a misunderstood path of", " a volatile mixture of", " a tricky and complex", " an explosive state of"
        ],
        endings: [
            "rivalry.", "enmity.", "conflict.", "disagreement.", "potential hostility.",
            "misunderstanding.", "clashing vibes.", "opposition.", "battle.", "friction."
        ]
    },
    Siblings: {
        openers: [
            "Blood matches blood in", "A familiar bond echoes", "You share the spirit of", "Destiny ties you as", "A protective vibe signals",
            "The roots run deep finding", "Reflections of the same soul show", "A bond beyond friendship reveals", "The family star shines on", "An innate connection suggests"
        ],
        middles: [
            " a biologically deep", " a protective and brotherly/sisterly", " a familiar and close", " a nagging but loving", " a genetically linked",
            " a chaotic but loyal", " a deeply rooted", " a shared heritage of", " a lifelong but platonic", " a kindred spirit of"
        ],
        endings: [
            "brotherhood/sisterhood.", "sibling energy.", "family bonding.", "kinship.", "brotherly love.",
            "sisterly affection.", "shared DNA vibes.", "family ties.", "fraternal connection.", "household chaos."
        ]
    }
};

export const getDynamicQuote = (name1: string, name2: string, result: FlamesResult): string => {
    // 1. Create a deterministic seed from the names
    // Sort names to ensure "Alex + Bob" gives same quote as "Bob + Alex"
    const sortedNames = [name1.toLowerCase().trim(), name2.toLowerCase().trim()].sort().join("");
    const seed = getHash(sortedNames);

    // 2. Get templates for the result
    const templates = QUOTE_TEMPLATES[result];

    // 3. Select fragments based on seed
    // We use different bit shifts or modulo offsets to pick different parts "randomly" but deterministically
    const opener = templates.openers[seed % templates.openers.length];
    const middle = templates.middles[(seed >> 2) % templates.middles.length];
    const ending = templates.endings[(seed >> 4) % templates.endings.length];

    return `${opener}${middle} ${ending}`;
};
