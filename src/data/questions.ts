import { QuestionSchema, type Question } from "~/data/types";

const questions: Question[] = [
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
        id: "q_privacy",
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
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_proprietary",
        text: "How important is it that everything works right away?",
        options: [
            {
                id: "required",
                label: "I want everything to work immediately",
                patches: [{ op: "set", field: "proprietary", value: "REQUIRED" }],
                isDisqualifier: false,
            },
            {
                id: "optional",
                label: "I'm okay installing a few extras",
                patches: [{ op: "set", field: "proprietary", value: "OPTIONAL" }],
                isDisqualifier: false,
            },
            {
                id: "avoid",
                label: "I want only free/open software",
                patches: [{ op: "set", field: "proprietary", value: "AVOID" }],
                isDisqualifier: false,
            },
        ],
    },
    {
        id: "q_maintenance",
        text: "If something doesn't work, what feels right to you?",
        options: [
            {
                id: "no_terminal",
                label: "I want buttons and menus, not commands",
                patches: [{ op: "set", field: "maintenance", value: "NO_TERMINAL" }],
                isDisqualifier: false,
            },
            {
                id: "terminal_ok",
                label: "I can follow a step-by-step guide",
                patches: [{ op: "set", field: "maintenance", value: "TERMINAL_OK" }],
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
                id: "cli_ok",
                label: "I don't mind a more hands-on setup",
                patches: [{ op: "set", field: "installation", value: "CLI_OK" }],
                isDisqualifier: false,
            },
        ],
    },
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
                patches: [],
                isDisqualifier: false,
            },
        ],
    },
];

export const ALL_QUESTIONS = QuestionSchema.array().parse(questions);
