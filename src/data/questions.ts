import { QuestionSchema, type Question } from "~/data/types";

const questions: Question[] = [
    // ---------------------------
    // LEVEL 0 — Broad purpose (non-technical)
    // ---------------------------
    {
        id: "q_purpose",
        text: "What do you mainly want to use this computer for?",
        options: [
            {
                id: "everyday",
                label: "Everyday stuff (web, email, documents)",
                patches: [{ op: "add_tag", value: "Work" }],
                isDisqualifier: false,
            },
            {
                id: "gaming",
                label: "Gaming",
                patches: [{ op: "add_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
            {
                id: "privacy",
                label: "Privacy-focused use",
                patches: [{ op: "add_tag", value: "Privacy" }],
                isDisqualifier: false,
            },
            {
                id: "server",
                label: "Running a home server",
                patches: [{ op: "add_tag", value: "Server" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 1 — Comfort & expectations (non-technical)
    // ---------------------------
    {
        id: "q_comfort_style",
        text: "Which statement fits you best?",
        options: [
            {
                id: "simple",
                label: "I want a calm, simple system that doesn’t ask much from me",
                patches: [
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                    { op: "set", field: "installation", value: "GUI" },
                ],
                isDisqualifier: false,
            },
            {
                id: "guided",
                label: "I’m okay following clear steps if needed",
                patches: [{ op: "set", field: "maintenance", value: "TERMINAL_OK" }],
                isDisqualifier: false,
            },
            {
                id: "tinker",
                label: "I like customizing and figuring things out",
                patches: [
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                    { op: "set", field: "installation", value: "CLI_OK" },
                ],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_works_right_away",
        text: "How important is it that most things work right away?",
        options: [
            {
                id: "very",
                label: "Very important — I want minimal setup",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "ok_with_some",
                label: "I’m okay doing a bit of setup",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
            {
                id: "only_free",
                label: "I want only free/open software",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_old_hardware",
        text: "Is this computer older or not very powerful?",
        options: [
            {
                id: "yes",
                label: "Yes, it’s pretty old",
                patches: [
                    { op: "add_tag", value: "OldHardware" },
                    { op: "set", field: "minRam", value: 4 },
                ],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No, it’s fairly modern",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_installation",
        text: "How would you like to install Linux?",
        options: [
            {
                id: "gui",
                label: "I want a simple installer",
                patches: [{ op: "set", field: "installation", value: "GUI" }],
                isDisqualifier: false,
            },
            {
                id: "hands_on",
                label: "I’m okay with a more hands-on setup",
                patches: [{ op: "set", field: "installation", value: "CLI_OK" }],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_troubleshooting_style",
        text: "If something doesn’t work, what feels most comfortable?",
        options: [
            {
                id: "menus",
                label: "I want buttons and menus, not commands",
                patches: [{ op: "set", field: "maintenance", value: "NO_TERMINAL" }],
                isDisqualifier: false,
            },
            {
                id: "follow_steps",
                label: "I can follow a step-by-step guide",
                patches: [{ op: "set", field: "maintenance", value: "TERMINAL_OK" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 2 — Privacy branch
    // ---------------------------
    {
        id: "q_privacy_importance",
        text: "How important is privacy to you?",
        options: [
            {
                id: "very_important",
                label: "Very important",
                patches: [{ op: "add_tag", value: "Privacy" }],
                isDisqualifier: false,
            },
            {
                id: "balanced",
                label: "I care, but convenience matters too",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_privacy_tradeoff",
        text: "When privacy conflicts with convenience, what do you prefer?",
        showIf: { field: "tags", op: "contains", value: "Privacy" },
        options: [
            {
                id: "privacy_first",
                label: "Privacy first, even if some things are harder",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
            {
                id: "balanced",
                label: "Balance is fine — I still want things to work smoothly",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 3 — Work / everyday branch
    // ---------------------------
    {
        id: "q_everyday_apps",
        text: "Which feels closer to your expectation for everyday apps?",
        showIf: { field: "tags", op: "contains", value: "Work" },
        options: [
            {
                id: "must_just_work",
                label: "I want common apps and media to work without hassle",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "ok_alternatives",
                label: "I’m okay using alternatives and doing small setup",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 4 — Gaming branch (x86_64 only)
    // ---------------------------
    {
        id: "q_gaming",
        text: "Do you plan to play games on this machine?",
        showIf: { field: "architecture", op: "eq", value: "x86_64" },
        options: [
            {
                id: "yes",
                label: "Yes",
                patches: [{ op: "add_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No",
                patches: [{ op: "remove_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_gaming_expectation",
        text: "What best describes what you expect from gaming on Linux?",
        showIf: { field: "tags", op: "contains", value: "Gaming" },
        options: [
            {
                id: "plug_and_play",
                label: "I want it to be as smooth as possible",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "i_can_tweak",
                label: "I can tweak settings if needed",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_anticheat_warning",
        text: "Do you mainly play games that require strict anti-cheat that may not work on Linux?",
        showIf: { field: "tags", op: "contains", value: "Gaming" },
        options: [
            {
                id: "yes",
                label: "Yes",
                patches: [],
                isDisqualifier: true,
            },
            {
                id: "no",
                label: "No / Not sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 5 — Server branch
    // ---------------------------
    {
        id: "q_server_comfort",
        text: "For a home server, what setup style do you prefer?",
        showIf: { field: "tags", op: "contains", value: "Server" },
        options: [
            {
                id: "simple_admin",
                label: "I want simple setup and straightforward maintenance",
                patches: [
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
            {
                id: "hands_on_server",
                label: "I’m okay managing it in a more hands-on way",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 6 — Advanced refinement (only when user signals hands-on)
    // ---------------------------
    {
        id: "q_advanced_control",
        text: "Do you want maximum control, even if it takes more effort?",
        showIf: {
            op: "or",
            conditions: [
                { field: "installation", op: "eq", value: "CLI_OK" },
                { field: "maintenance", op: "eq", value: "TERMINAL_OK" },
            ],
        },
        options: [
            {
                id: "yes",
                label: "Yes, I’m fine spending time configuring things",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No, I prefer a smoother experience",
                patches: [
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_open_software_strictness",
        text: "How strict do you want to be about using only free/open software?",
        showIf: {
            op: "or",
            conditions: [
                { field: "tags", op: "contains", value: "Privacy" },
                { field: "proprietary", op: "eq", value: "AVOID" },
            ],
        },
        options: [
            {
                id: "strict",
                label: "Strict — I want only free/open software",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
            {
                id: "practical",
                label: "Practical — I prefer open, but I can accept exceptions",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 7 — Optional RAM refinement (still non-technical)
    // ---------------------------
    {
        id: "q_ram_hint",
        text: "Roughly, how much memory (RAM) does your computer have?",
        options: [
            {
                id: "ram_4",
                label: "4 GB or less",
                patches: [{ op: "set", field: "minRam", value: 4 }],
                isDisqualifier: false,
            },
            {
                id: "ram_8",
                label: "8 GB",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
            {
                id: "ram_16",
                label: "16 GB or more",
                patches: [{ op: "set", field: "minRam", value: 16 }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "I’m not sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // LEVEL 8 — Architecture clarification (only if you choose to ask users)
    // NOTE: if architecture is always detected, you can remove this.
    // ---------------------------
    {
        id: "q_architecture_clarifier",
        text: "Are you using a typical Windows-style PC, or an ARM-based device?",
        options: [
            {
                id: "pc",
                label: "Typical PC / laptop",
                patches: [{ op: "set", field: "architecture", value: "x86_64" }],
                isDisqualifier: false,
            },
            {
                id: "arm",
                label: "ARM device (some newer devices use this)",
                patches: [{ op: "set", field: "architecture", value: "arm64" }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "Not sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },

    {
        id: "q_arm_expectation",
        text: "On ARM devices, Linux options can be more limited. What do you prefer?",
        showIf: { field: "architecture", op: "eq", value: "arm64" },
        options: [
            {
                id: "simple",
                label: "Keep it simple and stable",
                patches: [
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
            {
                id: "i_can_tinker",
                label: "I can handle a more hands-on setup",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
        ],
    },
];

export const ALL_QUESTIONS = QuestionSchema.array().parse(questions);
