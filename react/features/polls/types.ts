export type Answer = {

    /**
     * An array of boolean: true if the answer was chosen by the responder, else false.
     */
    answers: Array<boolean>,

    /**
     * ID of the parent Poll of this answer.
     */
    pollId: string,

    /**
     * ID of the voter for this answer.
     */
    voterId: string,

    /**
     * Name of the voter.
     */
    voterName: string
};

export type Poll = {

    /**
     * An array of answers:
     * the name of the answer name and a map of ids and names of voters voting for this option.
     */
    answers: Array<{ name: string, voters: Map<string, string> }>,

    /**
     * Whether the poll vote is being edited/changed.
     */
    changingVote: boolean,


    /**
     * The last sent votes for this poll, or null if voting was skipped
     * Note: This is reset when voting/skipping, not when clicking "Change vote".
     */
    lastVote: Array<boolean> | null,

    /**
     * The question asked by this poll.
     */
    question: string,

    /**
     * ID of the sender of this poll.
     */
    senderId: string,

    /**
     * Name of the sender of this poll
     * Store poll sender name in case they exit the call.
     */
    senderName: string,

    /**
     * Whether the results should be shown instead of the answer form.
     */
    showResults: boolean
};
