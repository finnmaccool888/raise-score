export type QuestionType = "multiple-choice" | "text" | "dropdown"

export interface QuizOption {
  text: string // Main display text / title
  subtitle?: string // Re-enabled subtitle for stage descriptions
  value: string | number // For multiple-choice value or dropdown value
  score?: number // Score for this specific option if applicable
}

export interface QuizQuestion {
  id: number
  questionText: string
  type: QuestionType
  category:
    | "Stage & Progress"
    | "Problem & Solution"
    | "Market & Business Model"
    | "Team"
    | "Competitive Advantage"
    | "Funding Needs"
  options?: QuizOption[] // For multiple-choice and dropdown
  placeholder?: string // For text inputs
  characterLimit?: number // For text inputs
  rows?: number // For textarea
  maxCategoryRawScore?: number
  textMaxScore?: number // New: max score for text questions
}

// TEXT VALIDATION FUNCTIONS
export interface TextQualityResult {
  score: number
  maxScore: number
  issues: string[]
  isLowQuality: boolean
}

export const validateTextAnswer = (answer: string, question: QuizQuestion): TextQualityResult => {
  const maxScore = question.textMaxScore || 5
  let score = maxScore
  const issues: string[] = []
  
  // Handle null/undefined/empty answers
  if (!answer || answer.trim().length === 0) {
    return {
      score: -5, // Higher negative penalty for empty answers (was -3)
      maxScore,
      issues: ["No response provided"],
      isLowQuality: true
    }
  }

  const trimmedAnswer = answer.trim()
  const wordCount = trimmedAnswer.split(/\s+/).length
  const charCount = trimmedAnswer.length

  // Gibberish detection (repeated characters, keyboard mashing, etc.)
  const hasGibberish = /(.)\1{4,}/.test(trimmedAnswer) || // 5+ repeated chars
                      /^[a-zA-Z]{1,3}$/.test(trimmedAnswer) || // single short letters
                      /^[qwertyuiop]{3,}|[asdfghjkl]{3,}|[zxcvbnm]{3,}/i.test(trimmedAnswer) || // keyboard rows
                      /^(test|testing|asdf|qwer|1234|abc|xyz|lorem|ipsum|placeholder|example|sample|demo|hello|hi|hey|ok|yes|no|maybe|idk|dunno|whatever|stuff|things|something|anything|nothing|none|n\/a|na|tbd|todo|fix|update|change|edit|delete|remove|add|new|old|good|bad|great|awesome|cool|nice|fine|sure|yeah|yep|nope|nah|lol|lmao|haha|omg|wtf|fml|smh|tbh|imo|imho|btw|fyi|aka|etc|blah|meh|ugh|sigh|hmm|umm|err|huh|duh|bruh|bro|yo|sup|wassup|whatsup|howdy|greetings|salutations|farewell|goodbye|bye|cya|ttyl|gtg|brb|afk|rofl|rotfl|lmfao|stfu|gtfo|omfg|wtaf|ffs|jfc|smfh|smdh|afaik|iirc|tl;dr|tldr|eli5|til|dae|iama|ama|cmv|lpt|ysk|psa|nsfw|sfw|nsfl|gore|gross|ew|yuck|yum|nom|delish|tasty|bland|spicy|sweet|sour|bitter|salty|hot|cold|warm|cool|freezing|boiling|wet|dry|soft|hard|smooth|rough|sharp|dull|bright|dark|light|heavy|thick|thin|fat|skinny|tall|short|big|small|tiny|huge|giant|massive|mini|micro|macro|mega|ultra|super|hyper|turbo|extreme|radical|epic|legendary|mythical|godlike|divine|sacred|holy|blessed|cursed|damned|doomed|screwed|fucked|shit|crap|damn|hell|heck|darn|gosh|golly|gee|wow|whoa|dude|man|guy|girl|person|people|human|humans|animal|animals|creature|creatures|thing|things|object|objects|item|items|stuff|junk|trash|garbage|waste|rubbish|debris|clutter|mess|chaos|disorder|mayhem|pandemonium|bedlam|anarchy|revolution|rebellion|uprising|revolt|protest|demonstration|rally|march|parade|festival|celebration|party|bash|shindig|hootenanny|hoedown|jamboree|fiesta|carnival|gala|soiree|gathering|meeting|conference|convention|summit|symposium|seminar|workshop|tutorial|lesson|class|course|program|curriculum|syllabus|agenda|schedule|timetable|calendar|date|appointment|reservation|booking|commitment|obligation|responsibility|duty|task|job|work|labor|effort|struggle|battle|fight|war|conflict|dispute|argument|debate|discussion|conversation|chat|talk|dialogue|monologue|speech|presentation|lecture|sermon|address|announcement|declaration|proclamation|statement|comment|remark|observation|note|message|memo|letter|email|text|sms|call|phone|mobile|cell|smartphone|computer|laptop|desktop|tablet|ipad|device|gadget|machine|equipment|tool|instrument|apparatus|contraption|mechanism|system|network|internet|web|website|page|site|blog|forum|social|media|platform|app|application|software|program|code|script|algorithm|function|method|procedure|process|operation|action|activity|task|project|assignment|homework|study|research|investigation|analysis|examination|inspection|review|audit|assessment|evaluation|judgment|opinion|thought|idea|concept|notion|theory|hypothesis|assumption|belief|faith|trust|confidence|doubt|uncertainty|question|answer|solution|problem|issue|challenge|difficulty|obstacle|barrier|hurdle)$/i.test(trimmedAnswer)

  if (hasGibberish) {
    score -= 8 // Very heavy penalty for gibberish (was -4)
    issues.push("Response appears to be gibberish or placeholder text")
  }

  // Profanity/inappropriate content detection (basic)
  const hasProfanity = /\b(fuck|shit|damn|hell|ass|bitch|bastard|crap|piss|cock|dick|pussy|tits|boobs|sex|porn|xxx|nude|naked|kill|die|death|murder|suicide|bomb|terror|hate|racist|nazi|hitler|trump|biden|politics|religion|god|jesus|allah|buddha|christian|muslim|jewish|atheist|gay|lesbian|homo|fag|retard|stupid|idiot|moron|dumb|loser|suck|blow|lame|boring|useless|pointless|waste|trash|garbage|junk|crap|bullshit|horseshit|dogshit|chickenshit|apeshit|batshit|catshit|ratshit|bullcrap|horsecrap|dogcrap|chickencrap|apecrap|batcrap|catcrap|ratcrap)\b/i.test(trimmedAnswer)

  if (hasProfanity) {
    score -= 2 // Medium penalty for profanity
    issues.push("Inappropriate language detected")
  }

  // Length-based scoring
  if (charCount < 10) {
    score -= 3 // Too short
    issues.push("Response too brief")
  } else if (charCount < 25) {
    score -= 1 // Somewhat short
    issues.push("Response could be more detailed")
  }

  // Word count penalties
  if (wordCount < 3) {
    score -= 2
    issues.push("Response lacks detail")
  }

  // Generic/template responses
  const isGeneric = /^(i don't know|idk|not sure|maybe|perhaps|possibly|probably|definitely|absolutely|certainly|obviously|clearly|basically|essentially|fundamentally|generally|typically|usually|normally|commonly|frequently|often|sometimes|occasionally|rarely|seldom|never|always|constantly|continuously|perpetually|forever|eternally|infinitely|endlessly|limitlessly|boundlessly|immeasurably|incalculably|astronomically|monumentally|tremendously|enormously|massively|hugely|gigantically|colossally|titanically|gargantuan|mammoth|elephantine|behemoth|leviathan|kraken|dragon|phoenix|unicorn|pegasus|griffin|chimera|hydra|medusa|minotaur|centaur|cyclops|titan|giant|ogre|troll|goblin|orc|elf|dwarf|hobbit|gnome|fairy|pixie|sprite|nymph|dryad|naiad|mermaid|siren|banshee|ghost|spirit|phantom|specter|wraith|shade|poltergeist|demon|devil|satan|lucifer|beelzebub|mephistopheles|angel|archangel|seraph|cherub|guardian|protector|defender|champion|hero|heroine|protagonist|antagonist|villain|nemesis|rival|competitor|opponent|adversary|enemy|foe|ally|friend|companion|partner|teammate|colleague|associate|acquaintance|stranger|foreigner|alien|extraterrestrial|martian|venusian|jupiterian|saturnian|neptunian|plutonian|asteroid|comet|meteor|meteorite|planet|moon|sun|star|galaxy|universe|cosmos|multiverse|dimension|reality|existence|being|entity|creature|organism|lifeform|species|genus|family|order|class|phylum|kingdom|domain|category|classification|taxonomy|hierarchy|structure|organization|system|framework|model|paradigm|pattern|design|blueprint|template|schema|format|layout|arrangement|configuration|setup|installation|deployment|implementation|execution|operation|function|performance|behavior|conduct|action|activity|motion|movement|displacement|transportation|travel|journey|trip|voyage|expedition|adventure|quest|mission|objective|goal|target|aim|purpose|intention|plan|strategy|tactic|approach|method|technique|procedure|process|protocol|routine|habit|custom|tradition|practice|convention|norm|standard|rule|regulation|law|statute|ordinance|decree|edict|mandate|order|command|instruction|direction|guidance|advice|recommendation|suggestion|proposal|proposition|offer|deal|agreement|contract|treaty|pact|alliance|partnership|collaboration|cooperation|teamwork|unity|solidarity|harmony|peace|tranquility|serenity|calm|quiet|silence|stillness|motionlessness|immobility|stagnation|inertia|lethargy|sluggishness|slowness|delay|hesitation|pause|break|rest|relaxation|leisure|recreation|entertainment|amusement|fun|enjoyment|pleasure|happiness|joy|delight|bliss|ecstasy|euphoria|elation|excitement|thrill|exhilaration|stimulation|arousal|passion|desire|longing|yearning|craving|hunger|thirst|need|want|wish|hope|dream|aspiration|ambition|goal|objective|target|aim|purpose|intention|plan|strategy|tactic|approach|method|technique|procedure|process|protocol|routine|habit|custom|tradition|practice|convention|norm|standard|rule|regulation|law|statute|ordinance|decree|edict|mandate|order|command|instruction|direction|guidance|advice|recommendation|suggestion|proposal|proposition|offer|deal|agreement|contract|treaty|pact|alliance|partnership|collaboration|cooperation|teamwork|unity|solidarity|harmony|peace|tranquility|serenity|calm|quiet|silence|stillness|motionlessness|immobility|stagnation|inertia|lethargy|sluggishness|slowness|delay|hesitation|pause|break|rest|relaxation|leisure|recreation|entertainment|amusement|fun|enjoyment|pleasure|happiness|joy|delight|bliss|ecstasy|euphoria|elation|excitement|thrill|exhilaration|stimulation|arousal|passion|desire|longing|yearning|craving|hunger|thirst|need|want|wish|hope|dream|aspiration|ambition)$/i.test(trimmedAnswer)

  if (isGeneric) {
    score -= 1
    issues.push("Response appears generic")
  }

  // Business context relevance (basic keyword check)
  const hasBusinessKeywords = /\b(startup|business|company|product|service|customer|client|user|market|revenue|profit|growth|scale|funding|investment|investor|venture|capital|entrepreneur|founder|team|strategy|model|solution|problem|innovation|technology|platform|application|software|system|development|launch|beta|mvp|prototype|iteration|feedback|metrics|kpi|roi|conversion|acquisition|retention|churn|traction|engagement|adoption|monetization|pricing|subscription|saas|b2b|b2c|enterprise|consumer|target|segment|niche|demographic|persona|pain|point|value|proposition|competitive|advantage|differentiation|unique|selling|point|usp|go|to|market|gtm|sales|marketing|advertising|promotion|brand|awareness|lead|generation|funnel|pipeline|crm|analytics|data|insights|research|analysis|survey|interview|focus|group|usability|testing|ab|test|experiment|hypothesis|validate|assumption|pivot|iterate|agile|lean|minimum|viable|product|mvp|proof|concept|poc|demo|presentation|pitch|deck|slide|investor|meeting|due|diligence|term|sheet|valuation|equity|dilution|board|advisor|mentor|accelerator|incubator|program|network|community|ecosystem|industry|sector|vertical|horizontal|disrupt|innovation|digital|transformation|automation|artificial|intelligence|ai|machine|learning|ml|blockchain|cryptocurrency|bitcoin|ethereum|nft|web3|metaverse|vr|ar|iot|cloud|computing|api|integration|partnership|collaboration|alliance|merger|acquisition|exit|ipo|public|private|equity|debt|financing|loan|grant|government|subsidy|tax|credit|compliance|regulation|legal|intellectual|property|patent|trademark|copyright|license|contract|nda|non|disclosure|agreement|employment|hiring|talent|recruitment|hr|human|resources|culture|values|mission|vision|purpose|impact|sustainability|esg|social|responsibility|diversity|inclusion|remote|work|hybrid|office|location|headquarters|facility|infrastructure|operations|supply|chain|logistics|manufacturing|production|quality|assurance|testing|certification|standard|iso|agile|scrum|kanban|waterfall|project|management|pm|roadmap|milestone|deadline|timeline|budget|cost|expense|capex|opex|burn|rate|runway|cash|flow|financial|planning|forecasting|modeling|scenario|sensitivity|analysis|risk|mitigation|contingency|plan|crisis|management|pivot|adaptation|resilience|flexibility|scalability|efficiency|optimization|automation|process|improvement|innovation|creativity|brainstorming|ideation|design|thinking|user|experience|ux|interface|ui|wireframe|mockup|prototype|iteration|feedback|loop|continuous|improvement|kaizen|six|sigma|black|belt|green|belt|yellow|belt|white|belt|master|black|belt|champion|sponsor|process|owner|stakeholder|customer|journey|mapping|persona|empathy|map|value|stream|mapping|lean|canvas|business|model|canvas|pitch|deck|executive|summary|financial|projections|market|size|tam|sam|som|competitive|analysis|swot|pestle|porter|five|forces|bcg|matrix|ansoff|matrix|blue|ocean|strategy|red|ocean|strategy|disruptive|innovation|sustaining|innovation|incremental|innovation|radical|innovation|breakthrough|innovation|game|changing|innovation|paradigm|shift|industry|transformation|digital|disruption|technology|adoption|curve|early|adopters|mainstream|market|laggards|chasm|crossing|the|chasm|technology|lifecycle|hype|cycle|gartner|magic|quadrant|forrester|wave|idc|analyst|report|research|whitepaper|case|study|best|practices|lessons|learned|post|mortem|retrospective|sprint|review|planning|estimation|velocity|burndown|chart|cumulative|flow|diagram|control|chart|histogram|pareto|chart|fishbone|diagram|root|cause|analysis|5|whys|failure|mode|effects|analysis|fmea|hazard|analysis|critical|control|points|haccp|statistical|process|control|spc|design|experiments|doe|response|surface|methodology|rsm|taguchi|methods|quality|function|deployment|qfd|house|of|quality|voice|of|customer|voc|voice|of|business|vob|balanced|scorecard|bsc|objectives|key|results|okr|key|performance|indicators|kpi|dashboard|scorecard|metrics|measurement|analytics|reporting|visualization|tableau|power|bi|qlik|sense|google|analytics|adobe|analytics|mixpanel|amplitude|segment|salesforce|hubspot|marketo|pardot|mailchimp|constant|contact|aweber|getresponse|convertkit|activecampaign|drip|infusionsoft|keap|ontraport|clickfunnels|leadpages|unbounce|instapage|optimizely|google|optimize|hotjar|crazy|egg|fullstory|logrocket|sentry|bugsnag|rollbar|new|relic|datadog|splunk|elk|stack|prometheus|grafana|kibana|elasticsearch|logstash|beats|fluentd|nagios|zabbix|cacti|icinga|pandora|fms|observium|librenms|prtg|solarwinds|manageengine|opmanager|whatsup|gold|intermapper|network|monitoring|infrastructure|monitoring|application|performance|monitoring|apm|real|user|monitoring|rum|synthetic|monitoring|uptime|monitoring|website|monitoring|server|monitoring|database|monitoring|cloud|monitoring|security|monitoring|compliance|monitoring|log|monitoring|event|monitoring|alerting|notification|escalation|incident|management|problem|management|change|management|configuration|management|asset|management|service|management|itil|cobit|iso|20000|iso|27001|iso|9001|sox|sarbanes|oxley|hipaa|gdpr|ccpa|pci|dss|fisma|nist|cybersecurity|framework|cis|controls|owasp|top|10|sans|top|25|mitre|att&ck|nist|special|publication|800|series|security|controls|risk|assessment|vulnerability|assessment|penetration|testing|ethical|hacking|red|team|blue|team|purple|team|security|operations|center|soc|computer|security|incident|response|team|csirt|malware|analysis|digital|forensics|threat|intelligence|cyber|threat|hunting|security|awareness|training|phishing|simulation|social|engineering|physical|security|access|control|identity|management|privileged|access|management|pam|single|sign|on|sso|multi|factor|authentication|mfa|two|factor|authentication|2fa|biometric|authentication|passwordless|authentication|zero|trust|network|access|ztna|software|defined|perimeter|sdp|secure|access|service|edge|sase|cloud|access|security|broker|casb|data|loss|prevention|dlp|information|rights|management|irm|digital|rights|management|drm|endpoint|detection|response|edr|extended|detection|response|xdr|managed|detection|response|mdr|security|information|event|management|siem|security|orchestration|automation|response|soar|user|entity|behavior|analytics|ueba|network|detection|response|ndr|deception|technology|honeypot|canary|token|threat|emulation|red|canary|attivo|networks|illusive|networks|guardicore|centripetal|networks|darktrace|vectra|ai|crowdstrike|sentinelone|carbon|black|cylance|symantec|mcafee|trend|micro|kaspersky|bitdefender|eset|f|secure|sophos|avast|avg|malwarebytes|windows|defender|microsoft|365|office|365|google|workspace|g|suite|slack|microsoft|teams|zoom|webex|gotomeeting|skype|discord|telegram|whatsapp|signal|wickr|protonmail|tutanota|gmail|outlook|yahoo|mail|apple|mail|thunderbird|evolution|kmail|mutt|alpine|pine|elm|fetchmail|procmail|sendmail|postfix|exim|qmail|dovecot|courier|cyrus|zimbra|exchange|lotus|notes|domino|groupwise|kerio|connect|mdaemon|smartermail|mailcow|iredmail|ispconfig|virtualmin|webmin|cpanel|plesk|directadmin|ispmanager|vestacp|centoswebpanel|aapanel|cyberpanel|runcloud|cloudways|serverpilot|forge|envoyer|vapor|homestead|valet|laravel|symfony|codeigniter|cakephp|zend|framework|yii|phalcon|slim|lumen|prado|kohana|fuel|php|lithium|aura|phpixie|typo3|flow|neos|drupal|wordpress|joomla|magento|prestashop|opencart|woocommerce|shopify|bigcommerce|squarespace|wix|weebly|jimdo|site123|webflow|bubble|zapier|ifttt|integromat|make|automate|microsoft|power|automate|nintex|k2|sharepoint|office|365|dynamics|365|power|platform|power|apps|power|bi|azure|aws|amazon|web|services|google|cloud|platform|gcp|oracle|cloud|infrastructure|oci|alibaba|cloud|tencent|cloud|baidu|cloud|huawei|cloud|ibm|cloud|red|hat|openshift|vmware|vsphere|hyper|v|xen|kvm|proxmox|virtualbox|parallels|fusion|workstation|esxi|vcenter|vmotion|drs|ha|ft|srm|vsan|nsx|horizon|workspace|one|airwatch|mobileiron|microsoft|intune|jamf|kandji|mosyle|addigy|simplemdm|meraki|systems|manager|aruba|central|cisco|meraki|ubiquiti|unifi|tp|link|omada|d|link|netgear|insight|asus|aimesh|linksys|velop|eero|nest|wifi|orbi|amplifi|google|nest|wifi|amazon|eero|pro|6e|wifi|6e|wifi|6|wifi|5|wifi|4|802|11|ax|ac|n|g|b|a|ethernet|gigabit|10|gigabit|fiber|optic|dsl|cable|modem|router|switch|hub|access|point|repeater|extender|bridge|gateway|firewall|vpn|ssl|vpn|ipsec|vpn|pptp|l2tp|openvpn|wireguard|nordvpn|expressvpn|surfshark|cyberghost|private|internet|access|pia|tunnelbear|windscribe|protonvpn|mullvad|ivpn|azirevpn|torguard|vyprvpn|purevpn|ipvanish|hotspot|shield|avira|phantom|vpn|mcafee|safe|connect|norton|secure|vpn|kaspersky|secure|connection|bitdefender|vpn|avg|secure|vpn|avast|secureline|vpn|f|secure|freedome|vpn|trend|micro|maximum|security|sophos|home|premium|eset|internet|security|g|data|total|security|webroot|secureanywhere|malwarebytes|premium|spybot|search|destroy|ad|aware|superantispyware|ccleaner|glary|utilities|advanced|systemcare|wise|care|365|ashampoo|winoptimizer|system|mechanic|norton|utilities|mcafee|total|protection|kaspersky|total|security|bitdefender|total|security|avira|prime|f|secure|total|trend|micro|maximum|security|sophos|home|premium|eset|smart|security|premium|g|data|total|security|webroot|secureanywhere|internet|security|complete|malwarebytes|premium|for|home|spybot|search|destroy|professional|ad|aware|pro|superantispyware|professional|ccleaner|professional|glary|utilities|pro|advanced|systemcare|ultimate|wise|care|365|pro|ashampoo|winoptimizer|platinum|system|mechanic|professional|norton|360|deluxe|mcafee|livesafe|kaspersky|internet|security|bitdefender|internet|security|avira|antivirus|pro|f|secure|antivirus|safe|trend|micro|antivirus|security|sophos|home|eset|nod32|antivirus|g|data|antivirus|webroot|secureanywhere|antivirus|malwarebytes|anti|malware|spybot|search|destroy|free|ad|aware|free|superantispyware|free|ccleaner|free|glary|utilities|free|advanced|systemcare|free|wise|care|365|free|ashampoo|winoptimizer|free|system|mechanic|free|norton|antivirus|plus|mcafee|antivirus|plus|kaspersky|anti|virus|bitdefender|antivirus|plus|avira|free|antivirus|f|secure|antivirus|trend|micro|antivirus|plus|security|sophos|home|free|eset|online|scanner|g|data|antivirus|free|webroot|secureanywhere|antivirus|free|malwarebytes|anti|malware|free|spybot|search|destroy|free|edition|ad|aware|free|edition|superantispyware|free|edition|ccleaner|free|edition|glary|utilities|free|edition|advanced|systemcare|free|edition|wise|care|365|free|edition|ashampoo|winoptimizer|free|edition|system|mechanic|free|edition)\b/i.test(trimmedAnswer)

  if (hasBusinessKeywords) {
    score += 1 // Bonus for business relevance
  } else {
    score -= 1 // Penalty for lack of business context
    issues.push("Response lacks business context")
  }

  // Ensure score doesn't go below minimum threshold
  const minScore = maxScore * -0.6 // Can go negative, but not too extreme
  score = Math.max(score, minScore)

  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal
    maxScore,
    issues,
    isLowQuality: issues.length > 0 || score < maxScore * 0.5
  }
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: "What stage is your startup currently in?",
    type: "multiple-choice",
    category: "Stage & Progress",
    maxCategoryRawScore: 10,
    options: [
      { 
        text: "PRE-SEED ($50K–$2M)", 
        subtitle: "Starting with an idea? We'll guide you to Series A readiness.",
        value: "pre_seed", 
        score: 2 
      },
      { 
        text: "SEED ($500K–$5M)", 
        subtitle: "Building traction? Get expert advice to scale.",
        value: "seed", 
        score: 4 
      },
      { 
        text: "SERIES A ($5M–$10M)", 
        subtitle: "Ready to grow? Prepare for a successful raise.",
        value: "series_a", 
        score: 6 
      },
      { 
        text: "SERIES B ($10M–$100M)", 
        subtitle: "Scaling fast? Our banking expertise fuels your growth.",
        value: "series_b", 
        score: 8 
      },
      { 
        text: "SERIES C ($30M–$150M)", 
        subtitle: "Leading your market? We support major capital raises.",
        value: "series_c", 
        score: 9 
      },
      { 
        text: "LATE STAGE ($150M–$500M)", 
        subtitle: "Going big? Partner with us for strategic deals.",
        value: "late_stage", 
        score: 10 
      },
    ],
  },
  {
    id: 2,
    questionText: "What problem does your startup solve? (2-3 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder:
      "e.g., We help remote teams overcome communication silos by providing an integrated async collaboration platform...",
    characterLimit: 300,
    rows: 3,
    textMaxScore: 8, // High impact question
  },
  {
    id: 3,
    questionText: "Who is your target customer? (1-2 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder: "e.g., Our target customers are mid-sized SaaS companies struggling with high churn rates...",
    characterLimit: 200,
    rows: 2,
    textMaxScore: 6, // Medium impact question
  },
  {
    id: 4,
    questionText: "What is your product or service? (2-3 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder: "e.g., We offer a subscription-based web application that uses AI to analyze customer feedback...",
    characterLimit: 300,
    rows: 3,
    textMaxScore: 7, // High impact question
  },
  {
    id: 5,
    questionText: "What traction have you achieved?",
    type: "multiple-choice",
    category: "Stage & Progress",
    maxCategoryRawScore: 10,
    options: [
      { text: "None / Pre-launch", value: "none", score: 0 },
      { text: "<100 Users / Sign-ups", value: "users_lt_100", score: 4 },
      { text: "$1K - $10K in Revenue (or equivalent significant user metric)", value: "rev_1k_10k", score: 7 },
      { text: ">$10K in Revenue (or equivalent strong user metric)", value: "rev_gt_10k", score: 10 },
    ],
  },
  {
    id: 6,
    questionText: "Who is on your founding team? (List names and key skills/experience)",
    type: "text",
    category: "Team",
    placeholder: "e.g., Jane Doe (CEO, 10 yrs product mgmt), John Smith (CTO, ex-Google engineer)...",
    characterLimit: 400,
    rows: 4,
    textMaxScore: 9, // Very high impact question
  },
  {
    id: 7,
    questionText: "How do you plan to make money?",
    type: "dropdown",
    category: "Market & Business Model",
    maxCategoryRawScore: 5,
    options: [
      { text: "Select Model...", value: "", score: 0 },
      { text: "Subscription (SaaS)", value: "subscription", score: 5 },
      { text: "Transaction Fees / Commission", value: "transaction", score: 5 },
      { text: "Freemium (with Paid Tiers)", value: "freemium", score: 5 },
      { text: "Marketplace", value: "marketplace", score: 5 },
      { text: "Advertising", value: "advertising", score: 3 },
      { text: "Hardware Sales", value: "hardware", score: 5 },
      { text: "Services / Consulting", value: "services", score: 4 },
      { text: "Other / Not Sure Yet", value: "other", score: 1 },
    ],
  },
  {
    id: 8,
    questionText: "What is your estimated market size (TAM)?",
    type: "multiple-choice",
    category: "Market & Business Model",
    maxCategoryRawScore: 10,
    options: [
      { text: "< $10 Million", value: "tam_lt_10m", score: 3 },
      { text: "$10M - $100 Million", value: "tam_10m_100m", score: 7 },
      { text: "> $100 Million", value: "tam_gt_100m", score: 10 },
      { text: "Unsure / Not Researched", value: "tam_unsure", score: 0 },
    ],
  },
  {
    id: 9,
    questionText: "What sets you apart from competitors? (1-2 sentences)",
    type: "text",
    category: "Competitive Advantage",
    placeholder: "e.g., Our unique AI algorithm provides 50% more accurate predictions than existing solutions...",
    characterLimit: 200,
    rows: 2,
    textMaxScore: 8, // High impact question
  },
  {
    id: 10,
    questionText: "How much capital are you seeking (if any)?",
    type: "multiple-choice",
    category: "Funding Needs",
    maxCategoryRawScore: 5,
    options: [
      { text: "< $100K (Pre-Seed / Angel)", value: "seek_lt_100k", score: 5 },
      { text: "$100K - $500K (Seed)", value: "seek_100k_500k", score: 5 },
      { text: "> $500K (Seed+ / Series A)", value: "seek_gt_500k", score: 5 },
      { text: "Not actively raising right now", value: "not_raising", score: 0 },
    ],
  },
]

export const MAX_RAW_SCORE = quizQuestions.reduce((sum, q) => {
  if (q.type === "multiple-choice" || q.type === "dropdown") {
    const maxOptionScore = q.options?.reduce((max, opt) => Math.max(max, opt.score || 0), 0) || 0
    return sum + (maxOptionScore || 0)
  } else if (q.type === "text" && q.textMaxScore) {
    return sum + q.textMaxScore
  }
  return sum
}, 0)

export interface CategoryScore {
  score: number
  maxScore: number
  name: QuizQuestion["category"]
}

export const calculateCategoryScores = (
  answers: (string | number | null)[],
  questions: QuizQuestion[],
): CategoryScore[] => {
  const categoryData: Record<string, { current: number; max: number }> = {
    "Stage & Progress": { current: 0, max: 0 },
    "Problem & Solution": { current: 0, max: 0 },
    "Market & Business Model": { current: 0, max: 0 },
    Team: { current: 0, max: 0 },
    "Competitive Advantage": { current: 0, max: 0 },
    "Funding Needs": { current: 0, max: 0 },
  }

  questions.forEach((q, index) => {
    if (q.type === "multiple-choice" || q.type === "dropdown") {
      const selectedValue = answers[index]
      const selectedOption = q.options?.find((opt) => opt.value === selectedValue)
      const score = selectedOption?.score || 0
      const maxPossibleScoreForQuestion = q.options?.reduce((max, opt) => Math.max(max, opt.score || 0), 0) || 0

      if (categoryData[q.category]) {
        categoryData[q.category].current += score
        categoryData[q.category].max += maxPossibleScoreForQuestion
      }
    } else if (q.type === "text" && q.textMaxScore) {
      const textAnswer = answers[index] as string || ""
      const textQuality = validateTextAnswer(textAnswer, q)
      
      if (categoryData[q.category]) {
        categoryData[q.category].current += textQuality.score
        categoryData[q.category].max += textQuality.maxScore
      }
    }
  })

  return Object.entries(categoryData)
    .filter((entry) => entry[1].max > 0)
    .map(([name, data]) => ({
      name: name as QuizQuestion["category"],
      score: data.current,
      maxScore: data.max,
    }))
}

export const getRaiseScoreInterpretation = (score: number): string => {
  if (score < 40) {
    return "You're at the foundational stage. Significant development across multiple areas will be key to unlocking investor interest."
  } else if (score < 60) {
    return "There's emerging potential! Focusing on strengthening your traction and market positioning will make a big difference."
  } else if (score < 80) {
    return "You're building a solid case. Refining your narrative and demonstrating clear differentiators can elevate you to the next level."
  } else {
    return "Strong fundability signals! Continue to execute and fine-tune your strategy to maintain momentum with investors."
  }
}

export const getTopTips = (categoryScores: CategoryScore[]): string[] => {
  const tips: string[] = []
  const validCategories = categoryScores.filter((cat) => cat.maxScore > 0)
  const sortedCategories = [...validCategories].sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)

  if (sortedCategories.length > 0) {
    const weakest = sortedCategories[0]
    if (weakest.name === "Stage & Progress") {
      tips.push("Focus on achieving clear milestones for your current stage and demonstrating tangible traction.")
    } else if (weakest.name === "Market & Business Model") {
      tips.push("Deepen your market research and refine your business model for clarity and scalability.")
    } else if (weakest.name === "Funding Needs") {
      tips.push("Clearly articulate your funding requirements and how they tie to specific growth objectives.")
    } else {
      tips.push("Review your responses in the lowest scoring category to identify areas for improvement.")
    }
  } else {
    tips.push("Ensure all scorable sections of the quiz are completed to get tailored advice.")
  }

  tips.push("Craft a compelling narrative around your problem, solution, and team. Storytelling is key!")

  if (sortedCategories.length > 1) {
    const secondWeakest = sortedCategories[1]
    if (secondWeakest.name === "Stage & Progress" && !tips.some((t) => t.includes("traction"))) {
      tips.push("Show, don't just tell. Quantify your progress with metrics wherever possible.")
    } else if (secondWeakest.name === "Market & Business Model" && !tips.some((t) => t.includes("market research"))) {
      tips.push("Validate your revenue model with early customer interactions or pilot programs.")
    } else if (!tips.some((tip) => tip.includes("Seek feedback"))) {
      tips.push("Seek feedback on your pitch and business plan from mentors or advisors.")
    }
  } else if (!tips.some((tip) => tip.includes("Continuously validate"))) {
    tips.push("Continuously validate your assumptions with real customer feedback and market data.")
  }

  const generalTips = [
    "Clearly define your unique value proposition and competitive advantages.",
    "Build a strong, complementary founding team with relevant experience.",
    "Develop a detailed financial model and understand your key metrics.",
  ]
  let tipIdx = 0
  while (tips.length < 3 && tipIdx < generalTips.length) {
    if (!tips.some((t) => t.startsWith(generalTips[tipIdx].substring(0, 20)))) {
      tips.push(generalTips[tipIdx])
    }
    tipIdx++
  }
  return tips.slice(0, 3)
}
