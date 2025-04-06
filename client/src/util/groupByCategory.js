export function groupByCategory(quizArray) {
    return quizArray.reduce((acc, question) => {
        const { category } = question;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(question);
        return acc;
    }, {});
}