import { QuestionSchema, type Question } from "~/data/types";

const questions: Question[] = [
    {
        id: "q_gaming",
        text: "Do you plan to game on this machine?",
        // Only show if architecture is x86_64
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
    {
        id: "q_anticheat",
        text: "Do you play games with kernel-level anti-cheat (e.g. Valorant, COD)?",
        // Only show if user said YES to Gaming AND is on x86_64
        showIf: {
            op: "and",
            conditions: [
                { field: "architecture", op: "eq", value: "x86_64" },
                { field: "tags", op: "contains", value: "Gaming" },
            ],
        },
        options: [
            {
                id: "yes",
                label: "Yes",
                isDisqualifier: true,
                patches: [],
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
