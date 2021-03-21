module.exports = {
    // the main method that organizes the raw input
    organize(rawNodes) {
        rawNodes = Object.keys(rawNodes)
                    .sort((a, b) => (parseInt(b) - parseInt(a)))
                    .map((key) => (rawNodes[key]));
        let result = [];
        const self = this;
        rawNodes.forEach(
            groupedNodes => {
                result = self.addChildren(result, groupedNodes);
            }
        );
        return result;
    },

    // add children nodes from result array into parent nodes
    addChildren(result, groupedNodes) {
        result.forEach(childNode => {
            const parentNode = groupedNodes.find(parentNode => parentNode.id == childNode.parent_id);
            parentNode.children.push(childNode);
        })
        return groupedNodes;
    }
};