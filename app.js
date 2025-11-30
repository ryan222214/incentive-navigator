// Incentive Navigator v1
// Static, no backend, no AI. Pure framework.

// Grab DOM elements
const situationInput = document.getElementById("situationInput");
const situationTypeSelect = document.getElementById("situationType");
const analyzeBtn = document.getElementById("analyzeBtn");

const resultSection = document.getElementById("resultSection");
const quickSummaryEl = document.getElementById("quickSummary");

const actorsList = document.getElementById("actorsList");
const goalsList = document.getElementById("goalsList");
const incentivesList = document.getElementById("incentivesList");
const outcomesList = document.getElementById("outcomesList");
const questionsList = document.getElementById("questionsList");
const movesList = document.getElementById("movesList");

// Base templates for each situation type
const BASE_TEMPLATES = {
  work: {
    label: "Work or career",
    actors: [
      "You as the worker, with limited time and energy",
      "Your manager or boss, who is judged on team output and stability",
      "The company or organization, which cares about cost, risk, and performance"
    ],
    goals: [
      "You want fair treatment, growth, stability, and freedom over your time",
      "Your manager wants results with as little friction and risk as possible",
      "The company wants revenue, reputation, and control over costs"
    ],
    incentives: [
      "Managers are usually rewarded for output, not for fairness to individuals",
      "Policies are often written to protect the company, not to optimize for your life",
      "It is cheaper for the system if you stay quiet than if they change the structure"
    ],
    outcomes: [
      "If no constraint is created, the system will continue to repeat the same pattern",
      "People in power will usually follow their metrics, even if it hurts individuals",
      "Small unfairness often compounds over time into resentment or burnout"
    ],
    questions: [
      "What is my manager actually judged or reviewed on",
      "Where is the company trying to reduce cost or risk in this situation",
      "What would happen to them if they fully prioritized what I want"
    ],
    moves: [
      "Make invisible costs visible, for example by calmly explaining tradeoffs",
      "Set clear boundaries in writing instead of only hinting at them",
      "Start building outside options so that you are less dependent on one gatekeeper"
    ]
  },
  money: {
    label: "Money, business, or pricing",
    actors: [
      "You as the buyer, client, or user",
      "The seller or representative in front of you",
      "The company or platform that designs the product and pricing"
    ],
    goals: [
      "You want good value, clear terms, and low regret",
      "The seller wants to close the sale and hit their numbers",
      "The company wants recurring revenue, lock in, and predictable cashflow"
    ],
    incentives: [
      "Pricing and packaging are often designed to push you toward higher margin options",
      "Small repeated payments feel painless, which benefits the seller",
      "Complex terms and fees make it harder for you to compare alternatives"
    ],
    outcomes: [
      "Upsells, add ons, and subscriptions are often pushed even when not ideal for you",
      "Default options will usually favor the company over your long term benefit",
      "If you do nothing, you may slowly pay more than you realize over time"
    ],
    questions: [
      "How does this company actually make most of its profit here",
      "What do I lose or commit to if I say yes to this",
      "What is the best realistic alternative available to me right now"
    ],
    moves: [
      "Compare at least one outside option before committing",
      "Ask for simple, concrete numbers instead of general promises",
      "Decide your red lines in advance so you are not pressured in the moment"
    ]
  },
  policy: {
    label: "Rules, policies, or institutions",
    actors: [
      "You as the individual affected by the rule",
      "The frontline person enforcing the rule",
      "The institution or authority that created the policy"
    ],
    goals: [
      "You want fairness, clarity, and some flexibility for edge cases",
      "Frontline staff want to avoid blame, conflict, and extra work",
      "The institution wants consistency, legal protection, and control"
    ],
    incentives: [
      "Policies are often written to avoid worst case scenarios, not optimize for you",
      "Staff are usually punished for breaking rules, not rewarded for making exceptions",
      "Complex systems prefer rigid rules because it makes them easier to administer"
    ],
    outcomes: [
      "Frontline staff will often say they cannot help even if they personally agree with you",
      "Appeals tend to be slow and exhausting, which reduces how many people push back",
      "Without clear documentation, your case is easier to dismiss"
    ],
    questions: [
      "Who gains or avoids risk by enforcing this rule exactly as written",
      "Is there a documented exception process and who controls it",
      "What evidence would make it costly for them to ignore my situation"
    ],
    moves: [
      "Stay calm and ask for the written policy or source instead of arguing in the abstract",
      "Document what happens so you can escalate with specifics, not just feelings",
      "Look for parallel paths instead of only pushing on one closed door"
    ]
  },
  relationship: {
    label: "Friends, family, or social",
    actors: [
      "You, with your needs, limits, and expectations",
      "The other person or people, with their own fears and desires",
      "The social environment around you, like family norms or group culture"
    ],
    goals: [
      "You want respect, understanding, and honest communication",
      "They want to protect their image, comfort, and sense of control",
      "The group wants stability and minimal open conflict"
    ],
    incentives: [
      "People avoid admitting fault when they fear shame or rejection",
      "Many families or groups punish direct confrontation instead of rewarding clarity",
      "Unspoken rules often push people to preserve short term peace over long term health"
    ],
    outcomes: [
      "If patterns are never named, they tend to repeat and harden over time",
      "People may react defensively even if deep down they know you are right",
      "You may start shrinking or over adapting to keep things smooth"
    ],
    questions: [
      "What are they afraid of losing if they fully acknowledged my point",
      "What am I afraid of losing if I state my needs clearly",
      "What hidden rule seems to be operating inside this relationship"
    ],
    moves: [
      "Describe the pattern and how it affects you, instead of attacking the person",
      "Set one small boundary and keep it, rather than trying to fix everything at once",
      "Invest in relationships that reward honesty so you are less trapped by one dynamic"
    ]
  },
  other: {
    label: "Other or mixed situations",
    actors: [
      "You as the observer or participant",
      "The people or groups whose choices you are puzzled by",
      "Any background system like a market, platform, or rule set"
    ],
    goals: [
      "You want to understand what is really going on, not just the surface story",
      "Each actor wants some mix of safety, status, control, comfort, or gain",
      "The surrounding system wants stability, predictability, and easy administration"
    ],
    incentives: [
      "People tend to respond to what is measured or rewarded, not to stated values",
      "Systems often protect themselves first, then individuals",
      "If something keeps happening, someone is benefiting from it"
    ],
    outcomes: [
      "Invisible incentives create patterns that look random or unfair from the outside",
      "Without understanding who gains what, you may misread motives",
      "Blaming intentions without mapping incentives rarely changes anything"
    ],
    questions: [
      "Who benefits directly or indirectly if this continues",
      "Who would lose money, power, or status if this changed",
      "What is easy for each actor and what is very costly for them"
    ],
    moves: [
      "Reframe the situation in terms of who gains what if you act or stay silent",
      "Look for small changes in your own behavior that change the payoff structure",
      "Focus on leverage points where small shifts in incentives can have large effects"
    ]
  }
};

// Keyword based tweaks to make the analysis feel more specific
const KEYWORD_HINTS = [
  {
    keywords: ["rent", "landlord", "lease"],
    incentives: [
      "Landlords respond strongly to local supply and demand for housing, not just individual stories",
      "If demand is high and vacancies are low, raising rent is rewarded and lowering it is punished"
    ],
    questions: [
      "What is the realistic alternative market rate around you",
      "How hard would it be for them to replace you as a tenant"
    ]
  },
  {
    keywords: ["subscription", "monthly fee", "premium", "upgrade"],
    incentives: [
      "Subscription models create smooth, predictable income for the company, which investors value",
      "Free tiers are often designed to gently push you toward paid plans over time"
    ],
    questions: [
      "If I refused the subscription entirely, what would they lose",
      "What exact feature justifies the ongoing cost for me personally"
    ]
  },
  {
    keywords: ["grade", "exam", "curve", "professor", "teacher"],
    incentives: [
      "Teachers are often rewarded for managing large groups, not for optimizing for each individual student",
      "Strict grading or curves can protect the teacher from accusations of being too easy"
    ],
    questions: [
      "What pressure is your teacher under from the institution",
      "What would make it easier for them to support you without extra risk"
    ]
  },
  {
    keywords: ["friend", "partner", "relationship", "family", "parents"],
    incentives: [
      "People often protect their self image even more than the relationship itself",
      "Old patterns from childhood or past relationships can drive reactions more than the current facts"
    ],
    questions: [
      "What story about themselves might this person be trying to protect",
      "What do I do that might accidentally confirm their fears"
    ]
  }
];

// Helper to find matching hints
function findKeywordHints(text) {
  const lower = text.toLowerCase();
  const matches = [];

  KEYWORD_HINTS.forEach((hint) => {
    const found = hint.keywords.some((kw) => lower.includes(kw));
    if (found) {
      matches.push(hint);
    }
  });

  return matches;
}

// Build a structured analysis object
function buildAnalysis(rawText, typeKey) {
  const text = rawText.trim();
  const type = BASE_TEMPLATES[typeKey] ? typeKey : "other";
  const base = BASE_TEMPLATES[type];

  const hints = text ? findKeywordHints(text) : [];

  const extraIncentives = [];
  const extraQuestions = [];

  hints.forEach((hint) => {
    if (hint.incentives) {
      extraIncentives.push.apply(extraIncentives, hint.incentives);
    }
    if (hint.questions) {
      extraQuestions.push.apply(extraQuestions, hint.questions);
    }
  });

  // Very short summary
  const summaryParts = [];

  summaryParts.push(
    `This looks like a ${base.label.toLowerCase()} situation where different sides are responding to their own incentives, not just their stated intentions.`
  );

  if (hints.length > 0) {
    summaryParts.push(
      "Your description includes cues that suggest some specific incentive patterns are active."
    );
  } else if (text.length > 0) {
    summaryParts.push(
      "Even without special keywords, the same basic principles apply: people follow rewards, avoid pain, and work around constraints."
    );
  }

  summaryParts.push(
    "Use this breakdown to see who gains what if things stay the same versus if they change."
  );

  return {
    summary: summaryParts.join(" "),
    actors: base.actors.slice(),
    goals: base.goals.slice(),
    incentives: base.incentives.concat(extraIncentives),
    outcomes: base.outcomes.slice(),
    questions: base.questions.concat(extraQuestions),
    moves: base.moves.slice()
  };
}

// Render helpers
function renderList(listEl, items) {
  listEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listEl.appendChild(li);
  });
}

// Main analyze click handler
analyzeBtn.addEventListener("click", () => {
  const text = situationInput.value.trim();
  const typeKey = situationTypeSelect.value;

  if (!text) {
    alert("Describe the situation first. A few sentences are enough.");
    situationInput.focus();
    return;
  }

  const analysis = buildAnalysis(text, typeKey);

  quickSummaryEl.textContent = analysis.summary;
  quickSummaryEl.classList.remove("hidden");

  renderList(actorsList, analysis.actors);
  renderList(goalsList, analysis.goals);
  renderList(incentivesList, analysis.incentives);
  renderList(outcomesList, analysis.outcomes);
  renderList(questionsList, analysis.questions);
  renderList(movesList, analysis.moves);

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
