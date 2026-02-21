import { QuestionSchema, type Condition, type Question } from "~/data/types";

const showIfIntermediate: Condition = { field: "experience", op: "eq", value: "INTERMEDIATE" };
const showIfAdvanced: Condition = { field: "experience", op: "eq", value: "ADVANCED" };
const showIfBeginnerOrIntermediate: Condition = { field: "experience", op: "in", value: ["BEGINNER", "INTERMEDIATE"] };

const questions: Question[] = [
    // ---------------------------
    // PHASE 0 — Familiarity selection
    // ---------------------------
    {
        id: "q_linux_familiarity",
        text: "questions.q_linux_familiarity.text",
        options: [
            {
                id: "beginner",
                label: "questions.q_linux_familiarity.options.beginner",
                description: "questions.q_linux_familiarity.options.beginner_desc",
                patches: [
                    { op: "set", field: "experience", value: "BEGINNER" },
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
            {
                id: "familiar",
                label: "questions.q_linux_familiarity.options.familiar",
                description: "questions.q_linux_familiarity.options.familiar_desc",
                patches: [{ op: "set", field: "experience", value: "INTERMEDIATE" }],
                isDisqualifier: false,
            },
            {
                id: "expert",
                label: "questions.q_linux_familiarity.options.expert",
                description: "questions.q_linux_familiarity.options.expert_desc",
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
        text: "questions.q_purpose.text",
        options: [
            {
                id: "everyday",
                label: "questions.q_purpose.options.everyday",
                patches: [{ op: "add_tag", value: "Work" }],
                isDisqualifier: false,
            },
            {
                id: "gaming",
                label: "questions.q_purpose.options.gaming",
                patches: [{ op: "add_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
            {
                id: "privacy",
                label: "questions.q_purpose.options.privacy",
                patches: [{ op: "add_tag", value: "Privacy" }],
                isDisqualifier: false,
            },
            {
                id: "server",
                label: "questions.q_purpose.options.server",
                patches: [{ op: "add_tag", value: "Server" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_device_type",
        text: "questions.q_device_type.text",
        options: [
            {
                id: "laptop",
                label: "questions.q_device_type.options.laptop",
                patches: [{ op: "set", field: "deviceType", value: "LAPTOP" }],
                isDisqualifier: false,
            },
            {
                id: "desktop",
                label: "questions.q_device_type.options.desktop",
                patches: [{ op: "set", field: "deviceType", value: "DESKTOP" }],
                isDisqualifier: false,
            },
            {
                id: "server",
                label: "questions.q_device_type.options.server",
                patches: [{ op: "set", field: "deviceType", value: "SERVER" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_works_right_away",
        text: "questions.q_works_right_away.text",
        options: [
            {
                id: "very",
                label: "questions.q_works_right_away.options.very",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "ok_with_some",
                label: "questions.q_works_right_away.options.ok_with_some",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
            {
                id: "only_free",
                label: "questions.q_works_right_away.options.only_free",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_installation",
        text: "questions.q_installation.text",
        options: [
            {
                id: "gui",
                label: "questions.q_installation.options.gui",
                patches: [{ op: "set", field: "installation", value: "GUI" }],
                isDisqualifier: false,
            },
            {
                id: "hands_on",
                label: "questions.q_installation.options.hands_on",
                patches: [{ op: "set", field: "installation", value: "CLI_OK" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_troubleshooting_style",
        text: "questions.q_troubleshooting_style.text",
        options: [
            {
                id: "menus",
                label: "questions.q_troubleshooting_style.options.menus",
                patches: [{ op: "set", field: "maintenance", value: "NO_TERMINAL" }],
                isDisqualifier: false,
            },
            {
                id: "follow_steps",
                label: "questions.q_troubleshooting_style.options.follow_steps",
                patches: [{ op: "set", field: "maintenance", value: "TERMINAL_OK" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_old_hardware",
        text: "questions.q_old_hardware.text",
        options: [
            {
                id: "yes",
                label: "questions.q_old_hardware.options.yes",
                patches: [
                    { op: "add_tag", value: "OldHardware" },
                    { op: "set", field: "minRam", value: 4 },
                ],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "questions.q_old_hardware.options.no",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_ram_hint",
        text: "questions.q_ram_hint.text",
        showIf: showIfBeginnerOrIntermediate,
        options: [
            {
                id: "ram_4",
                label: "questions.q_ram_hint.options.ram_4",
                patches: [{ op: "set", field: "minRam", value: 4 }],
                isDisqualifier: false,
            },
            {
                id: "ram_8",
                label: "questions.q_ram_hint.options.ram_8",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
            {
                id: "ram_16",
                label: "questions.q_ram_hint.options.ram_16",
                patches: [{ op: "set", field: "minRam", value: 16 }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "questions.q_ram_hint.options.not_sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_privacy_importance",
        text: "questions.q_privacy_importance.text",
        options: [
            {
                id: "very_important",
                label: "questions.q_privacy_importance.options.very_important",
                patches: [{ op: "add_tag", value: "Privacy" }],
                isDisqualifier: false,
            },
            {
                id: "balanced",
                label: "questions.q_privacy_importance.options.balanced",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_gpu_simple",
        text: "questions.q_gpu_simple.text",
        showIf: showIfBeginnerOrIntermediate,
        options: [
            {
                id: "nvidia",
                label: "questions.q_gpu_simple.options.nvidia",
                patches: [{ op: "set", field: "gpu", value: "NVIDIA" }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "questions.q_gpu_simple.options.not_sure",
                patches: [{ op: "set", field: "gpu", value: "UNKNOWN" }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "questions.q_gpu_simple.options.no",
                patches: [{ op: "set", field: "gpu", value: "INTEL_AMD" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_software_use_case",
        text: "questions.q_software_use_case.text",
        options: [
            {
                id: "office_suite",
                label: "questions.q_software_use_case.options.office_suite",
                patches: [{ op: "add_tag", value: "Office" }],
                isDisqualifier: false,
            },
            {
                id: "creative_apps",
                label: "questions.q_software_use_case.options.creative_apps",
                patches: [{ op: "add_tag", value: "Creative" }],
                isDisqualifier: false,
            },
            {
                id: "development_tools",
                label: "questions.q_software_use_case.options.development_tools",
                patches: [{ op: "add_tag", value: "Development" }],
                isDisqualifier: false,
            },
            {
                id: "basic_use",
                label: "questions.q_software_use_case.options.basic_use",
                patches: [{ op: "add_tag", value: "Basic" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_simple",
        text: "questions.q_secure_boot_simple.text",
        showIf: showIfBeginnerOrIntermediate,
        options: [
            {
                id: "yes",
                label: "questions.q_secure_boot_simple.options.yes",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "questions.q_secure_boot_simple.options.no",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "questions.q_secure_boot_simple.options.not_sure",
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
        text: "questions.q_phase_exit.text",
        showIf: showIfIntermediate,
        options: [
            {
                id: "refine_further",
                label: "questions.q_phase_exit.options.refine_further",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "see_results",
                label: "questions.q_phase_exit.options.see_results",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },

    // ---------------------------
    // PHASE 2 — Intermediate (plain language refinements)
    // ---------------------------
    {
        id: "q_architecture_clarifier",
        text: "questions.q_architecture_clarifier.text",
        showIf: showIfIntermediate,
        options: [
            {
                id: "pc",
                label: "questions.q_architecture_clarifier.options.pc",
                patches: [{ op: "set", field: "architecture", value: "x86_64" }],
                isDisqualifier: false,
            },
            {
                id: "arm",
                label: "questions.q_architecture_clarifier.options.arm",
                patches: [{ op: "set", field: "architecture", value: "arm64" }],
                isDisqualifier: false,
            },
            {
                id: "not_sure",
                label: "questions.q_architecture_clarifier.options.not_sure",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_arm_expectation",
        text: "questions.q_arm_expectation.text",
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
                label: "questions.q_arm_expectation.options.simple",
                patches: [
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
            {
                id: "i_can_tinker",
                label: "questions.q_arm_expectation.options.i_can_tinker",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_beginner_ui_style",
        text: "questions.q_beginner_ui_style.text",
        showIf: { field: "experience", op: "eq", value: "BEGINNER" },
        options: [
            {
                id: "windows_vibe",
                label: "questions.q_beginner_ui_style.options.windows_vibe",
                description: "questions.q_beginner_ui_style.options.windows_vibe_desc",
                image: "https://fedoraproject.org/w/uploads/6/62/Cinnamon-screenshot-2015-10-19.png", // Placeholder for bottom taskbar layout
                patches: [{ op: "set", field: "desktopPreference", value: "KDE" }],
                isDisqualifier: false,
            },
            {
                id: "mac_vibe",
                label: "questions.q_beginner_ui_style.options.mac_vibe",
                description: "questions.q_beginner_ui_style.options.mac_vibe_desc",
                image: "https://www.debugpoint.com/wp-content/uploads/2023/09/GNOME-Desktop-version-44.jpg", // Placeholder for centered/dock layout
                patches: [{ op: "set", field: "desktopPreference", value: "GNOME" }],
                isDisqualifier: false,
            },
            {
                id: "classic_vibe",
                label: "questions.q_beginner_ui_style.options.classic_vibe",
                description: "questions.q_beginner_ui_style.options.classic_vibe_desc",
                image: "https://www.debugpoint.com/wp-content/uploads/2023/09/Xfce-4.18-desktop.jpg", // Placeholder for classic layout
                patches: [{ op: "set", field: "desktopPreference", value: "XFCE" }],
                isDisqualifier: false,
            },
            {
                id: "open_vibe",
                label: "questions.q_beginner_ui_style.options.open_vibe",
                description: "questions.q_beginner_ui_style.options.open_vibe_desc",
                image: "https://www.debugpoint.com/wp-content/uploads/2024/03/Cosmic-desktop-dev-March-2024.jpg",
                patches: [{ op: "set", field: "desktopPreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_desktop_preference",
        text: "questions.q_desktop_preference.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "experience", op: "neq", value: "BEGINNER" }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_desktop_preference.options.no_preference",
                patches: [{ op: "set", field: "desktopPreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "gnome",
                label: "questions.q_desktop_preference.options.gnome",
                description: "questions.q_desktop_preference.options.gnome_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "GNOME" }],
                isDisqualifier: false,
            },
            {
                id: "kde",
                label: "questions.q_desktop_preference.options.kde",
                description: "questions.q_desktop_preference.options.kde_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "KDE" }],
                isDisqualifier: false,
            },
            {
                id: "xfce",
                label: "questions.q_desktop_preference.options.xfce",
                description: "questions.q_desktop_preference.options.xfce_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "XFCE" }],
                isDisqualifier: false,
            },
            {
                id: "cinnamon",
                label: "questions.q_desktop_preference.options.cinnamon",
                description: "questions.q_desktop_preference.options.cinnamon_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "CINNAMON" }],
                isDisqualifier: false,
            },
            {
                id: "mate",
                label: "questions.q_desktop_preference.options.mate",
                description: "questions.q_desktop_preference.options.mate_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "MATE" }],
                isDisqualifier: false,
            },
            {
                id: "lxqt",
                label: "questions.q_desktop_preference.options.lxqt",
                description: "questions.q_desktop_preference.options.lxqt_desc",
                patches: [{ op: "set", field: "desktopPreference", value: "LXQT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_release_model",
        text: "questions.q_release_model.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "experience", op: "neq", value: "BEGINNER" }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_release_model.options.no_preference",
                patches: [{ op: "set", field: "releaseModel", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "fixed",
                label: "questions.q_release_model.options.fixed",
                patches: [{ op: "set", field: "releaseModel", value: "FIXED" }],
                isDisqualifier: false,
            },
            {
                id: "rolling",
                label: "questions.q_release_model.options.rolling",
                patches: [{ op: "set", field: "releaseModel", value: "ROLLING" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_work_gaming_focus",
        text: "questions.q_work_gaming_focus.text",
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
                label: "questions.q_work_gaming_focus.options.mostly_work",
                patches: [
                    { op: "add_tag", value: "Work" },
                    { op: "remove_tag", value: "Gaming" },
                ],
                isDisqualifier: false,
            },
            {
                id: "mostly_gaming",
                label: "questions.q_work_gaming_focus.options.mostly_gaming",
                patches: [
                    { op: "add_tag", value: "Gaming" },
                    { op: "remove_tag", value: "Work" },
                ],
                isDisqualifier: false,
            },
            {
                id: "both",
                label: "questions.q_work_gaming_focus.options.both",
                patches: [
                    { op: "add_tag", value: "Work" },
                    { op: "add_tag", value: "Gaming" },
                ],
                isDisqualifier: false,
            },
            {
                id: "no_preference",
                label: "questions.q_work_gaming_focus.options.no_preference",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_clarifier",
        text: "questions.q_secure_boot_clarifier.text",
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
                label: "questions.q_secure_boot_clarifier.options.must_on",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "can_off",
                label: "questions.q_secure_boot_clarifier.options.can_off",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
            {
                id: "still_unsure",
                label: "questions.q_secure_boot_clarifier.options.still_unsure",
                patches: [{ op: "set", field: "secureBootNeeded", value: null }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_nvidia_tolerance",
        text: "questions.q_nvidia_tolerance.text",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "gpu", op: "eq", value: "NVIDIA" }],
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_nvidia_tolerance.options.no_preference",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "want_easy",
                label: "questions.q_nvidia_tolerance.options.want_easy",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "WANT_EASY" }],
                isDisqualifier: false,
            },
            {
                id: "ok_hands_on",
                label: "questions.q_nvidia_tolerance.options.ok_hands_on",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "OK_HANDS_ON" }],
                isDisqualifier: false,
            },
            {
                id: "avoid_proprietary",
                label: "questions.q_nvidia_tolerance.options.avoid_proprietary",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "AVOID_PROPRIETARY" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_everyday_apps",
        text: "questions.q_everyday_apps.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "tags", op: "contains", value: "Work" },
                { field: "proprietary", op: "eq", value: "OPTIONAL" }
            ],
        },
        options: [
            {
                id: "must_just_work",
                label: "questions.q_everyday_apps.options.must_just_work",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "ok_alternatives",
                label: "questions.q_everyday_apps.options.ok_alternatives",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_privacy_tradeoff",
        text: "questions.q_privacy_tradeoff.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate, 
                { field: "tags", op: "contains", value: "Privacy" },
                { field: "proprietary", op: "eq", value: "OPTIONAL" }
            ],
        },
        options: [
            {
                id: "privacy_first",
                label: "questions.q_privacy_tradeoff.options.privacy_first",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
            {
                id: "balanced",
                label: "questions.q_privacy_tradeoff.options.balanced",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_gaming",
        text: "questions.q_gaming.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate,
                { field: "architecture", op: "eq", value: "x86_64" },
                { field: "tags", op: "neq", value: "Gaming" }
            ],
        },
        options: [
            {
                id: "yes",
                label: "questions.q_gaming.options.yes",
                patches: [{ op: "add_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "questions.q_gaming.options.no",
                patches: [{ op: "remove_tag", value: "Gaming" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_gaming_expectation",
        text: "questions.q_gaming_expectation.text",
        showIf: {
            op: "and",
            conditions: [
                showIfIntermediate, 
                { field: "tags", op: "contains", value: "Gaming" },
                { field: "proprietary", op: "eq", value: "OPTIONAL" }
            ],
        },
        options: [
            {
                id: "plug_and_play",
                label: "questions.q_gaming_expectation.options.plug_and_play",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "i_can_tweak",
                label: "questions.q_gaming_expectation.options.i_can_tweak",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_anticheat_warning",
        text: "questions.q_anticheat_warning.text",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Gaming" }],
        },
        options: [
            {
                id: "yes",
                label: "questions.q_anticheat_warning.options.yes",
                patches: [],
                isDisqualifier: true,
                disqualificationReason: "questions.q_anticheat_warning.disqualification_reason"
            },
            {
                id: "no",
                label: "questions.q_anticheat_warning.options.no",
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_server_comfort",
        text: "questions.q_server_comfort.text",
        showIf: {
            op: "and",
            conditions: [showIfIntermediate, { field: "tags", op: "contains", value: "Server" }],
        },
        options: [
            {
                id: "simple_admin",
                label: "questions.q_server_comfort.options.simple_admin",
                patches: [
                    { op: "set", field: "installation", value: "GUI" },
                    { op: "set", field: "maintenance", value: "NO_TERMINAL" },
                ],
                isDisqualifier: false,
            },
            {
                id: "hands_on_server",
                label: "questions.q_server_comfort.options.hands_on_server",
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
        text: "questions.q_release_model_advanced.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced,
                { field: "releaseModel", op: "eq", value: "NO_PREFERENCE" }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_release_model_advanced.options.no_preference",
                patches: [{ op: "set", field: "releaseModel", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "fixed",
                label: "questions.q_release_model_advanced.options.fixed",
                patches: [{ op: "set", field: "releaseModel", value: "FIXED" }],
                isDisqualifier: false,
            },
            {
                id: "rolling",
                label: "questions.q_release_model_advanced.options.rolling",
                patches: [{ op: "set", field: "releaseModel", value: "ROLLING" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_desktop_preference_advanced",
        text: "questions.q_desktop_preference_advanced.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced,
                { field: "desktopPreference", op: "eq", value: "NO_PREFERENCE" }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_desktop_preference_advanced.options.no_preference",
                patches: [{ op: "set", field: "desktopPreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "gnome",
                label: "questions.q_desktop_preference_advanced.options.gnome",
                patches: [{ op: "set", field: "desktopPreference", value: "GNOME" }],
                isDisqualifier: false,
            },
            {
                id: "kde",
                label: "questions.q_desktop_preference_advanced.options.kde",
                patches: [{ op: "set", field: "desktopPreference", value: "KDE" }],
                isDisqualifier: false,
            },
            {
                id: "xfce",
                label: "questions.q_desktop_preference_advanced.options.xfce",
                patches: [{ op: "set", field: "desktopPreference", value: "XFCE" }],
                isDisqualifier: false,
            },
            {
                id: "cinnamon",
                label: "questions.q_desktop_preference_advanced.options.cinnamon",
                patches: [{ op: "set", field: "desktopPreference", value: "CINNAMON" }],
                isDisqualifier: false,
            },
            {
                id: "mate",
                label: "questions.q_desktop_preference_advanced.options.mate",
                patches: [{ op: "set", field: "desktopPreference", value: "MATE" }],
                isDisqualifier: false,
            },
            {
                id: "lxqt",
                label: "questions.q_desktop_preference_advanced.options.lxqt",
                patches: [{ op: "set", field: "desktopPreference", value: "LXQT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_gpu_confirm_advanced",
        text: "questions.q_gpu_confirm_advanced.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced,
                { field: "gpu", op: "eq", value: "UNKNOWN" }
            ]
        },
        options: [
            {
                id: "not_sure",
                label: "questions.q_gpu_confirm_advanced.options.not_sure",
                patches: [{ op: "set", field: "gpu", value: "UNKNOWN" }],
                isDisqualifier: false,
            },
            {
                id: "nvidia",
                label: "questions.q_gpu_confirm_advanced.options.nvidia",
                patches: [{ op: "set", field: "gpu", value: "NVIDIA" }],
                isDisqualifier: false,
            },
            {
                id: "intel_amd",
                label: "questions.q_gpu_confirm_advanced.options.intel_amd",
                patches: [{ op: "set", field: "gpu", value: "INTEL_AMD" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_secure_boot_advanced",
        text: "questions.q_secure_boot_advanced.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced,
                { field: "secureBootNeeded", op: "eq", value: null }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_secure_boot_advanced.options.no_preference",
                patches: [{ op: "set", field: "secureBootNeeded", value: null }],
                isDisqualifier: false,
            },
            {
                id: "must_on",
                label: "questions.q_secure_boot_advanced.options.must_on",
                patches: [{ op: "set", field: "secureBootNeeded", value: true }],
                isDisqualifier: false,
            },
            {
                id: "can_off",
                label: "questions.q_secure_boot_advanced.options.can_off",
                patches: [{ op: "set", field: "secureBootNeeded", value: false }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_nvidia_tolerance_advanced",
        text: "questions.q_nvidia_tolerance_advanced.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced, 
                { field: "gpu", op: "eq", value: "NVIDIA" },
                { field: "nvidiaTolerance", op: "eq", value: "NO_PREFERENCE" }
            ],
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_nvidia_tolerance_advanced.options.no_preference",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "want_easy",
                label: "questions.q_nvidia_tolerance_advanced.options.want_easy",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "WANT_EASY" }],
                isDisqualifier: false,
            },
            {
                id: "ok_hands_on",
                label: "questions.q_nvidia_tolerance_advanced.options.ok_hands_on",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "OK_HANDS_ON" }],
                isDisqualifier: false,
            },
            {
                id: "avoid_proprietary",
                label: "questions.q_nvidia_tolerance_advanced.options.avoid_proprietary",
                patches: [{ op: "set", field: "nvidiaTolerance", value: "AVOID_PROPRIETARY" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_open_software_strictness",
        text: "questions.q_open_software_strictness.text",
        showIf: {
            op: "and",
            conditions: [
                showIfAdvanced,
                { field: "proprietary", op: "eq", value: "OPTIONAL" }
            ]
        },
        options: [
            {
                id: "no_preference",
                label: "questions.q_open_software_strictness.options.no_preference",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "strict",
                label: "questions.q_open_software_strictness.options.strict",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
            {
                id: "practical",
                label: "questions.q_open_software_strictness.options.practical",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
            {
                id: "required",
                label: "questions.q_open_software_strictness.options.required",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_advanced_control",
        text: "questions.q_advanced_control.text",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "questions.q_advanced_control.options.no_preference",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "yes",
                label: "questions.q_advanced_control.options.yes",
                patches: [
                    { op: "set", field: "installation", value: "CLI_OK" },
                    { op: "set", field: "maintenance", value: "TERMINAL_OK" },
                ],
                isDisqualifier: false,
            },
            {
                id: "no",
                label: "questions.q_advanced_control.options.no",
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
        text: "questions.q_init_system_preference.text",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "questions.q_init_system_preference.options.no_preference",
                patches: [{ op: "set", field: "initSystem", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "systemd",
                label: "questions.q_init_system_preference.options.systemd",
                patches: [{ op: "set", field: "initSystem", value: "SYSTEMD" }],
                isDisqualifier: false,
            },
            {
                id: "openrc",
                label: "questions.q_init_system_preference.options.openrc",
                patches: [{ op: "set", field: "initSystem", value: "OPENRC" }],
                isDisqualifier: false,
            },
            {
                id: "runit",
                label: "questions.q_init_system_preference.options.runit",
                patches: [{ op: "set", field: "initSystem", value: "RUNIT" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_package_manager_preference",
        text: "questions.q_package_manager_preference.text",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "questions.q_package_manager_preference.options.no_preference",
                patches: [{ op: "set", field: "packageManager", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "apt",
                label: "questions.q_package_manager_preference.options.apt",
                patches: [{ op: "set", field: "packageManager", value: "APT" }],
                isDisqualifier: false,
            },
            {
                id: "dnf",
                label: "questions.q_package_manager_preference.options.dnf",
                patches: [{ op: "set", field: "packageManager", value: "DNF" }],
                isDisqualifier: false,
            },
            {
                id: "pacman",
                label: "questions.q_package_manager_preference.options.pacman",
                patches: [{ op: "set", field: "packageManager", value: "PACMAN" }],
                isDisqualifier: false,
            },
            {
                id: "zypper",
                label: "questions.q_package_manager_preference.options.zypper",
                patches: [{ op: "set", field: "packageManager", value: "ZYPPER" }],
                isDisqualifier: false,
            },
            {
                id: "apk",
                label: "questions.q_package_manager_preference.options.apk",
                patches: [{ op: "set", field: "packageManager", value: "APK" }],
                isDisqualifier: false,
            },
            {
                id: "nix",
                label: "questions.q_package_manager_preference.options.nix",
                patches: [{ op: "set", field: "packageManager", value: "NIX" }],
                isDisqualifier: false,
            },
            {
                id: "xbps",
                label: "questions.q_package_manager_preference.options.xbps",
                patches: [{ op: "set", field: "packageManager", value: "XBPS" }],
                isDisqualifier: false,
            },
            {
                id: "portage",
                label: "questions.q_package_manager_preference.options.portage",
                patches: [{ op: "set", field: "packageManager", value: "PORTAGE" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_atomic_preference",
        text: "questions.q_atomic_preference.text",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "questions.q_atomic_preference.options.no_preference",
                patches: [{ op: "set", field: "immutablePreference", value: "NO_PREFERENCE" }],
                isDisqualifier: false,
            },
            {
                id: "prefer_immutable",
                label: "questions.q_atomic_preference.options.prefer_immutable",
                patches: [{ op: "set", field: "immutablePreference", value: "PREFER_IMMUTABLE" }],
                isDisqualifier: false,
            },
            {
                id: "prefer_traditional",
                label: "questions.q_atomic_preference.options.prefer_traditional",
                patches: [{ op: "set", field: "immutablePreference", value: "PREFER_TRADITIONAL" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_ram_refinement_advanced",
        text: "questions.q_ram_refinement_advanced.text",
        showIf: showIfAdvanced,
        options: [
            {
                id: "no_preference",
                label: "questions.q_ram_refinement_advanced.options.no_preference",
                patches: [],
                isDisqualifier: false,
            },
            {
                id: "ram_4",
                label: "questions.q_ram_refinement_advanced.options.ram_4",
                patches: [{ op: "set", field: "minRam", value: 4 }],
                isDisqualifier: false,
            },
            {
                id: "ram_8",
                label: "questions.q_ram_refinement_advanced.options.ram_8",
                patches: [{ op: "set", field: "minRam", value: 8 }],
                isDisqualifier: false,
            },
            {
                id: "ram_16",
                label: "questions.q_ram_refinement_advanced.options.ram_16",
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
            "q_linux_familiarity",
            "q_purpose",
            "q_device_type",
            "q_works_right_away",
            "q_installation",
            "q_troubleshooting_style",
            "q_old_hardware",
            "q_ram_hint",
            "q_privacy_importance",
            "q_gpu_simple",
            "q_software_use_case",
            "q_secure_boot_simple",
            "q_beginner_ui_style",
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
            "q_atomic_preference",
            "q_ram_refinement_advanced",
        ],
    },
] as const;
