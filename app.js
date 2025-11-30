// Incentive Navigator v1.2
// Static, no backend, no AI. Pure framework with context aware patterns.

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

const copyBtn = document.getElementById("copyBtn");
const pathStayEl = document.getElementById("pathStay");
const pathChangeInsideEl = document.getElementById("pathChangeInside");
const pathExitEl = document.getElementById("pathExit");

// Base templates for each situation type
const BASE_TEMPLATES = {
  work: {
    label: "work or career",
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
    ],
    paths: {
      stay:
        "You keep the current arrangement and accept that the system will follow its metrics. This can be useful if you need short term stability while you quietly build skills, savings, or outside options. The risk is that the pattern hardens and your resentment grows faster than your leverage.",
      changeInside:
        "You try to shape incentives from inside. That can look like documenting the impact of the current pattern, making your boundaries explicit, or proposing small changes that make life better for you without adding big risk for them. This takes energy and patience, but sometimes unlocks better conditions without burning bridges.",
      exit:
        "You begin planning an exit so that this situation no longer controls you. That might involve learning skills, building a portfolio, saving a runway, or moving to a team or employer whose incentives match how you want to live. This path can be slower at first but often gives the largest long term change."
    }
  },
  money: {
    label: "money, business, or pricing",
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
      "Upsells, add ons, and subscriptions are often pushed even when they are not ideal for you",
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
    ],
    paths: {
      stay:
        "You accept the current pricing or arrangement and treat it as a conscious choice instead of a trap. This can be fine if the cost is small relative to the value you receive and you are not pretending it is something else.",
      changeInside:
        "You renegotiate or simplify. That might mean asking for a cheaper tier, removing extras, paying yearly instead of monthly, or moving to a clearer plan. The goal is to bend the current relationship closer to your interests without walking away entirely.",
      exit:
        "You end or avoid the deal and choose a different provider or method. This can feel inconvenient in the short term but often leads to much better alignment over time, especially if you pick systems that are built around transparency instead of confusion."
    }
  },
  policy: {
    label: "rules, policies, or institutions",
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
      "Policies are often written to avoid worst case scenarios, not to optimize for you",
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
    ],
    paths: {
      stay:
        "You comply with the policy and redirect your energy elsewhere. This is sensible when the cost to fight is high and the stakes for you are low. You preserve time and attention for areas where your leverage is higher.",
      changeInside:
        "You work through the official channels, gather documentation, and make a precise case. You accept that the institution moves slowly, and you try to adjust incentives by making it more costly for them to ignore your situation or similar ones.",
      exit:
        "You minimize your dependence on this institution by finding alternatives, reducing your exposure, or reorganizing your life so that this rule matters less. This is often the most powerful long term move, even if it is not quick."
    }
  },
  relationship: {
    label: "friends, family, or social dynamics",
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
    ],
    paths: {
      stay:
        "You keep the relationship as it is and accept the current pattern. This can make sense if the cost of change is higher than the benefit right now, but it also means planning for how you will protect your energy inside that pattern.",
      changeInside:
        "You name the pattern gently, state one clear boundary, and watch what happens. You focus on changing your own behavior in small, consistent steps instead of trying to fix the other person in one conversation.",
      exit:
        "You create distance or end the relationship, especially if it is draining or harmful. This is often emotionally hard but can create room for healthier dynamics that do not punish honesty."
    }
  },
  other: {
    label: "mixed or other situations",
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
    ],
    paths: {
      stay:
        "You observe the pattern and treat it as information. You do not try to change the system right away. Instead you use what you see to adjust your own expectations and choices.",
      changeInside:
        "You experiment with small interventions that might adjust incentives. That could be how you communicate, what you reward, what you ignore, or how you structure agreements.",
      exit:
        "You step out of this particular game and choose different games where your values, skills, and incentives line up more cleanly. Often the biggest shift comes not from winning the old game but from selecting a better one."
    }
  }
};

// Keyword based tweaks with context awareness
const KEYWORD_HINTS = [
  {
    // Housing and rent issues, usually money or policy
    keywords: ["rent", "landlord", "lease"],
    contexts: ["money", "policy", "other"],
    incentives: [
      "Landlords respond strongly to local supply and demand for housing, not just individual stories.",
      "If demand is high and vacancies are low, raising rent is rewarded and lowering it is punished."
    ],
    questions: [
      "What is the realistic alternative market rate around you",
      "How hard would it be for them to replace you as a tenant"
    ]
  },
  {
    // Subscriptions and upsells, money context
    keywords: ["subscription", "monthly fee", "premium", "upgrade"],
    contexts: ["money", "other"],
    incentives: [
      "Subscription models create smooth, predictable income for the company, which investors value.",
      "Free tiers are often designed to gently push you toward paid plans over time."
    ],
    questions: [
      "If I refused the subscription entirely, what would they lose",
      "What exact feature justifies the ongoing cost for me personally"
    ]
  },
  {
    // Sports betting and referral apps, your example
    keywords: ["sports betting", "betting app", "sportsbook", "parlay", "gambling", "casino", "odds", "sign up bonus", "referral"],
    contexts: ["money", "relationship", "other"],
    incentives: [
      "Betting platforms often use sign up bonuses and referral rewards to turn friends into unpaid sales reps.",
      "The house designs the odds so that, on average, it wins over time, even if some users get lucky in the short run.",
      "Friends who refer you may genuinely want you involved, but they are also rewarded if you join and play."
    ],
    questions: [
      "If I ignore the sign up bonus and look only at long term expected value, does this still make sense for me",
      "Who actually wins if I join and keep using this app over the next year",
      "If I say no clearly once, does the social pressure go up, down, or disappear"
    ]
  },
  {
    // School and grading
    keywords: ["grade", "exam", "curve", "professor", "teacher"],
    contexts: ["work", "policy", "other"],
    incentives: [
      "Teachers are often rewarded for managing large groups, not for optimizing for each individual student.",
      "Strict grading or curves can protect the teacher from accusations of being too easy."
    ],
    questions: [
      "What pressure is your teacher under from the institution",
      "What would make it easier for them to support you without extra risk"
    ]
  },
  {
    // Pure relationship dynamics, only for relationship context
    keywords: ["friend", "friends", "partner", "relationship", "family", "parents"],
    contexts: ["relationship"],
    incentives: [
      "People often protect their self image even more than the relationship itself.",
      "Old patterns from childhood or past relationships can drive reactions more than the current facts."
    ],
    questions: [
      "What story about themselves might this person be trying to protect",
      "What do I do that might accidentally confirm their fears"
    ]
  }
];

// Find matching hints and respect context
function findKeywordHints(text, typeKey) {
  const lower = text.toLowerCase();
  const matches = [];

  KEYWORD_HINTS.forEach((hint) => {
    const contextOk =
      !hint.contexts || hint.contexts.includes(typeKey) || hint.contexts.includes("other");
    if (!contextOk) return;

    const found = hint.keywords.some((kw) => lower.includes(kw));
    if (found) {
      matches.push(hint);
    }
  });

  return matches;
}

// Build analysis object
function buildAnalysis(rawText, typeKey) {
  const text = rawText.trim();
  const type = BASE_TEMPLATES[typeKey] ? typeKey : "other";
  const base = BASE_TEMPLATES[type];

  const hints = text ? findKeywordHints(text, type) : [];

  const extraIncentives = [];
  const extraQuestions = [];

  hints.forEach((hint) => {
    if (hint.incentives) {
      extraIncentives.push(...hint.incentives);
    }
    if (hint.questions) {
      extraQuestions.push(...hint.questions);
    }
  });

  const summaryParts = [];

  summaryParts.push(
    `You described a ${base.label} situation. Different sides are following the incentives around them, not just their stated values.`
  );

  if (hints.length > 0) {
    summaryParts.push(
      "Your description matches a few common patterns that tend to show up in this kind of scenario."
    );
  } else if (text.length > 0) {
    summaryParts.push(
      "Even without special keywords, the same rule applies: people move toward rewards, away from pain, and around constraints."
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
    moves: base.moves.slice(),
    paths: { ...base.paths }
  };
}

function renderList(listEl, items) {
  listEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listEl.appendChild(li);
  });
}

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

  pathStayEl.textContent = analysis.paths.stay;
  pathChangeInsideEl.textContent = analysis.paths.changeInside;
  pathExitEl.textContent = analysis.paths.exit;

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Copy full analysis as plain text
copyBtn.addEventListener("click", async () => {
  const text = situationInput.value.trim();
  if (!text || resultSection.classList.contains("hidden")) {
    alert("Run an analysis first, then you can copy it.");
    return;
  }

  const typeKey = situationTypeSelect.value;
  const analysis = buildAnalysis(text, typeKey);

  let out = "";
  out += "Situation:\n";
  out += text + "\n\n";

  out += "Summary:\n";
  out += analysis.summary + "\n\n";

  out += "Key actors:\n";
  analysis.actors.forEach((a) => (out += " - " + a + "\n"));
  out += "\n";

  out += "What each side wants:\n";
  analysis.goals.forEach((g) => (out += " - " + g + "\n"));
  out += "\n";

  out += "Incentives and constraints:\n";
  analysis.incentives.forEach((i) => (out += " - " + i + "\n"));
  out += "\n";

  out += "Likely outcomes:\n";
  analysis.outcomes.forEach((o) => (out += " - " + o + "\n"));
  out += "\n";

  out += "Questions to ask:\n";
  analysis.questions.forEach((q) => (out += " - " + q + "\n"));
  out += "\n";

  out += "Moves you can make:\n";
  analysis.moves.forEach((m) => (out += " - " + m + "\n"));
  out += "\n";

  out += "Strategy paths:\n";
  out += "Path A: Stay the course\n";
  out += analysis.paths.stay + "\n\n";
  out += "Path B: Change from inside\n";
  out += analysis.paths.changeInside + "\n\n";
  out += "Path C: Exit and pivot\n";
  out += analysis.paths.exit + "\n";

  try {
    await navigator.clipboard.writeText(out);
    alert("Analysis copied to clipboard.");
  } catch (err) {
    console.error(err);
    alert("Could not copy automatically. You can still select and copy manually.");
  }
});
