import { QuestionSchema, type Condition, type Question } from "~/data/types";

const showIfIntermediate: Condition = { field: "experience", op: "in", value: ["INTERMEDIATE", "ADVANCED"] };
const showIfAdvanced: Condition = { field: "experience", op: "eq", value: "ADVANCED" };

const questions: Question[] = [
    // ---------------------------
    // PHASE 0 — Experience selection
    // ---------------------------
    {
        id: "q_experience_depth",
        text: "How deep do you want to go?",
        options: [
            {
                id: "quick",
                label: "Quick",
                patches: [{ op: "set", field: "experience", value: "BEGINNER" }],
                isDisqualifier: false,
            },
            {
                id: "more_accurate",
                label: "More accurate",
                patches: [{ op: "set", field: "experience", value: "INTERMEDIATE" }],
                isDisqualifier: false,
            },
            {
                id: "expert_mode",
                label: "Expert mode",
                patches: [{ op: "set", field: "experience", value: "ADVANCED" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // PHASE 1 — Beginner (always asked)
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
                label: "I'm okay doing a bit of setup",
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
                label: "I'm okay with a more hands-on setup",
                patches: [{ op: "set", field: "installation", value: "CLI_OK" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_troubleshooting_style",
        text: "If something doesn't work, what feels most comfortable?",
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
    {
        id: "q_old_hardware",
        text: "Is this computer older or not very powerful?",
        options: [
            {
                id: "yes",
                label: "Yes, it's pretty old",
                patches: [
                    { op: "add_tag", value: "OldHardware" },
                    { op: "set", field: "minRam", value: 4 },
                ],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No, it's fairly modern",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
        ],
    },
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
                label: "I'm not sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
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
        id: "q_gpu_simple",
        text: "Do you have an NVIDIA graphics card?",
        options: [
            {
                id: "nvidia",
                label: "Yes, NVIDIA",
                patches: [{ op: "set", field: "gpu", value: "NVIDIA" }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "Not sure",
                patches: [{ op: "set", field: "gpu", value: "UNKNOWN" }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No",
                patches: [{ op: "set", field: "gpu", value: "INTEL_AMD" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_simple",
        text: "Does your computer need Secure Boot turned on?",
        options: [
            {
                id: "yes",
                label: "Yes, it should stay on",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "No, it can be off",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "Not sure",
                patches: [{ op: "set", field: "secureBootNeeded", value: null }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // PHASE EXIT — allow early results
    // ---------------------------
    {
        id: "q_phase_exit",
        text: "Want to see results now or refine further?",
        showIf: showIfIntermediate,
        options: [
            {
                id: "refine_further",
                label: "Refine further",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "see_results",
                label: "See results now",
                patches: [{ op: "set", field: "experience", value: "BEGINNER" }],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // PHASE 2 — Intermediate (plain language refinements)
    // ---------------------------
    {
        id: "q_architecture_clarifier",
        text: "Are you using a typical PC/laptop, or an ARM-based device?",
        showIf: showIfIntermediate,
        options: [
            {
                id: "pc",
                label: "Typical PC / laptop",
                patches: [{ op: "set", field: "architecture", value: "x86_64" }],
                isDisqualifier: false,
            },
            {
                id: "arm",
                label: "ARM-based device (some newer devices use this)",
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
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "architecture", op: "eq", value: "arm64" },
            ],
        },
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
    {
        id: "q_desktop_preference",
        text: "Do you have a desktop look you prefer?",
        showIf: showIfIntermediate,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "desktopPreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "gnome",
                label: "GNOME (clean and simple)",
                patches: [{ op: "set", field: "desktopPreference", value: "GNOME" }],
                isDisqualifier: false,
            },
            {
                id: "kde",
                label: "KDE Plasma (very customizable)",
                patches: [{ op: "set", field: "desktopPreference", value: "KDE" }],
                isDisqualifier: false,
            },
            {
                id: "xfce",
                label: "XFCE (lightweight)",
                patches: [{ op: "set", field: "desktopPreference", value: "XFCE" }],
                isDisqualifier: false,
            },
            {
                id: "cinnamon",
                label: "Cinnamon (familiar)",
                patches: [{ op: "set", field: "desktopPreference", value: "CINNAMON" }],
                isDisqualifier: false,
            },
            {
                id: "mate",
                label: "MATE (classic)",
                patches: [{ op: "set", field: "desktopPreference", value: "MATE" }],
                isDisqualifier: false,
            },
            {
                id: "lxqt",
                label: "LXQt (very light)",
                patches: [{ op: "set", field: "desktopPreference", value: "LXQT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_release_model",
        text: "How do you feel about updates?",
        showIf: showIfIntermediate,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "releaseModel", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "fixed",
                label: "Stable, less frequent updates",
                patches: [{ op: "set", field: "releaseModel", value: "FIXED" }],
                isDisqualifier: false,
            },
            {
                id: "rolling",
                label: "Latest features, frequent updates",
                patches: [{ op: "set", field: "releaseModel", value: "ROLLING" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_work_gaming_focus",
        text: "If you do both work and gaming, which matters more right now?",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                {
                    op: "or",
                    conditions: [
                        { field: "tags", op: "contains", value: "Work" },
                        { field: "tags", op: "contains", value: "Gaming" },
                    ],
                },
            ],
        },
        options: [
            {
                id: "mostly_work",
                label: "Mostly work or everyday use",
                patches: [
                    { op: "add_tag", value: "Work" },
                    { op: "remove_tag", value: "Gaming" },
                ],
                isDisqualifier: false,
            },
            {
                id: "mostly_gaming",
                label: "Mostly gaming",
                patches: [
                    { op: "add_tag", value: "Gaming" },
                    { op: "remove_tag", value: "Work" },
                ],
                isDisqualifier: false,
            },
            {
                id: "both",
                label: "Both about equally",
                patches: [
                    { op: "add_tag", value: "Work" },
                    { op: "add_tag", value: "Gaming" },
                ],
                isDisqualifier: false,
            },
            {
                id: "no_preference",
                label: "No preference",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_clarifier",
        text: "If Secure Boot comes up, what would you prefer?",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "secureBootNeeded", op: "eq", value: null },
            ],
        },
        options: [
            {
                id: "must_on",
                label: "It must stay on",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "can_off",
                label: "I can turn it off if needed",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
            {
                id: "still_unsure",
                label: "Still not sure",
                patches: [{ op: "set", field: "secureBootNeeded", value: null }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_nvidia_tolerance",
        text: "If you have NVIDIA, how much setup work are you willing to do?",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "gpu", op: "eq", value: "NVIDIA" }],
        },
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "want_easy",
                label: "I want it to work with minimal setup",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "WANT_EASY" }],
                isDisqualifier: false,
            },
            {
                id: "ok_hands_on",
                label: "I'm okay with extra steps",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "OK_HANDS_ON" }],
                isDisqualifier: false,
            },
            {
                id: "avoid_proprietary",
                label: "I prefer to avoid closed-source NVIDIA software",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "AVOID_PROPRIETARY" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_everyday_apps",
        text: "Which feels closer to your expectation for everyday apps?",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Work" }],
        },
        options: [
            {
                id: "must_just_work",
                label: "I want common apps and media to work without hassle",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "ok_alternatives",
                label: "I'm okay using alternatives and doing small setup",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_privacy_tradeoff",
        text: "When privacy conflicts with convenience, what do you prefer?",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Privacy" }],
        },
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
    {
        id: "q_gaming",
        text: "Do you plan to play games on this machine?",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "architecture", op: "eq", value: "x86_64" },
            ],
        },
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
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Gaming" }],
        },
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
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Gaming" }],
        },
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
    {
        id: "q_server_comfort",
        text: "For a home server, what setup style do you prefer?",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Server" }],
        },
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
                label: "I'm okay managing it in a more hands-on way",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // PHASE 3 — Advanced (expert-level refinements)
    // ---------------------------
    {
        id: "q_release_model_advanced",
        text: "At a technical level, do you prefer rolling or fixed releases?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "releaseModel", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "fixed",
                label: "Fixed releases (predictable, less frequent updates)",
                patches: [{ op: "set", field: "releaseModel", value: "FIXED" }],
                isDisqualifier: false,
            },
            {
                id: "rolling",
                label: "Rolling release (continuous updates)",
                patches: [{ op: "set", field: "releaseModel", value: "ROLLING" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_desktop_preference_advanced",
        text: "If you care about the desktop environment, pick one.",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "desktopPreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "gnome",
                label: "GNOME",
                patches: [{ op: "set", field: "desktopPreference", value: "GNOME" }],
                isDisqualifier: false,
            },
            {
                id: "kde",
                label: "KDE Plasma",
                patches: [{ op: "set", field: "desktopPreference", value: "KDE" }],
                isDisqualifier: false,
            },
            {
                id: "xfce",
                label: "XFCE",
                patches: [{ op: "set", field: "desktopPreference", value: "XFCE" }],
                isDisqualifier: false,
            },
            {
                id: "cinnamon",
                label: "Cinnamon",
                patches: [{ op: "set", field: "desktopPreference", value: "CINNAMON" }],
                isDisqualifier: false,
            },
            {
                id: "mate",
                label: "MATE",
                patches: [{ op: "set", field: "desktopPreference", value: "MATE" }],
                isDisqualifier: false,
            },
            {
                id: "lxqt",
                label: "LXQt",
                patches: [{ op: "set", field: "desktopPreference", value: "LXQT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_gpu_confirm_advanced",
        text: "Which GPU vendor best matches your system?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "not_sure",
                label: "Not sure / no preference",
                patches: [{ op: "set", field: "gpu", value: "UNKNOWN" }],
                isDisqualifier: false,
            },
            {
                id: "nvidia",
                label: "NVIDIA",
                patches: [{ op: "set", field: "gpu", value: "NVIDIA" }],
                isDisqualifier: false,
            },
            {
                id: "intel_amd",
                label: "Intel or AMD",
                patches: [{ op: "set", field: "gpu", value: "INTEL_AMD" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_advanced",
        text: "Secure Boot: do you require out-of-the-box support?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference / not sure",
                patches: [{ op: "set", field: "secureBootNeeded", value: null }],
                isDisqualifier: false,
            },
            {
                id: "must_on",
                label: "Yes, it must stay on",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "can_off",
                label: "No, I can disable it if needed",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_nvidia_tolerance_advanced",
        text: "For NVIDIA, which setup tradeoff do you accept?",
        showIf: {
            op: "and",
            conditions: [showIfAdvanced, { field: "gpu", op: "eq", value: "NVIDIA" }],
        },
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "want_easy",
                label: "Minimal setup",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "WANT_EASY" }],
                isDisqualifier: false,
            },
            {
                id: "ok_hands_on",
                label: "Hands-on setup is fine",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "OK_HANDS_ON" }],
                isDisqualifier: false,
            },
            {
                id: "avoid_proprietary",
                label: "Avoid closed-source NVIDIA software",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "AVOID_PROPRIETARY" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_open_software_strictness",
        text: "How strict do you want to be about proprietary software?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference / keep my earlier choice",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "strict",
                label: "Strict — only free/open software",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
            {
                id: "practical",
                label: "Practical — allow proprietary when needed",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
            {
                id: "required",
                label: "I need proprietary software to work",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_advanced_control",
        text: "Are you comfortable handling updates and fixes in the terminal when needed?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference / keep my earlier choice",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "yes",
                label: "Yes, I'm fine with hands-on maintenance",
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
        id: "q_init_system_preference",
        text: "Preferred init system?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "initSystem", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "systemd",
                label: "systemd",
                patches: [{ op: "set", field: "initSystem", value: "SYSTEMD" }],
                isDisqualifier: false,
            },
            {
                id: "openrc",
                label: "OpenRC",
                patches: [{ op: "set", field: "initSystem", value: "OPENRC" }],
                isDisqualifier: false,
            },
            {
                id: "runit",
                label: "runit",
                patches: [{ op: "set", field: "initSystem", value: "RUNIT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_package_manager_preference",
        text: "Preferred package manager?",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [{ op: "set", field: "packageManager", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "apt",
                label: "APT",
                patches: [{ op: "set", field: "packageManager", value: "APT" }],
                isDisqualifier: false,
            },
            {
                id: "dnf",
                label: "DNF",
                patches: [{ op: "set", field: "packageManager", value: "DNF" }],
                isDisqualifier: false,
            },
            {
                id: "pacman",
                label: "Pacman",
                patches: [{ op: "set", field: "packageManager", value: "PACMAN" }],
                isDisqualifier: false,
            },
            {
                id: "zypper",
                label: "Zypper",
                patches: [{ op: "set", field: "packageManager", value: "ZYPPER" }],
                isDisqualifier: false,
            },
            {
                id: "apk",
                label: "APK",
                patches: [{ op: "set", field: "packageManager", value: "APK" }],
                isDisqualifier: false,
            },
            {
                id: "nix",
                label: "Nix",
                patches: [{ op: "set", field: "packageManager", value: "NIX" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_ram_refinement_advanced",
        text: "If you want to refine RAM requirements, choose a minimum.",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "No preference",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "ram_4",
                label: "4 GB",
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
                label: "16 GB",
                patches: [{ op: "set", field: "minRam", value: 16 }],
                isDisqualifier: false,
            },
        ],
    },
];

export const ALL_QUESTIONS = QuestionSchema.array().parse(questions);

export const QUESTION_PHASES = [
    {
        key: "BEGINNER",
        label: "Beginner",
        questionIds: [
            "q_experience_depth",
            "q_purpose",
            "q_works_right_away",
            "q_installation",
            "q_troubleshooting_style",
            "q_old_hardware",
            "q_ram_hint",
            "q_privacy_importance",
            "q_gpu_simple",
            "q_secure_boot_simple",
        ],
    },
    {
        key: "REFINE",
        label: "Refine",
        questionIds: [
            "q_phase_exit",
            "q_architecture_clarifier",
            "q_arm_expectation",
            "q_desktop_preference",
            "q_release_model",
            "q_work_gaming_focus",
            "q_secure_boot_clarifier",
            "q_nvidia_tolerance",
            "q_everyday_apps",
            "q_privacy_tradeoff",
            "q_gaming",
            "q_gaming_expectation",
            "q_anticheat_warning",
            "q_server_comfort",
        ],
    },
    {
        key: "EXPERT",
        label: "Expert",
        questionIds: [
            "q_release_model_advanced",
            "q_desktop_preference_advanced",
            "q_gpu_confirm_advanced",
            "q_secure_boot_advanced",
            "q_nvidia_tolerance_advanced",
            "q_open_software_strictness",
            "q_advanced_control",
            "q_init_system_preference",
            "q_package_manager_preference",
            "q_ram_refinement_advanced",
        ],
    },
] as const;
