const titleCase = (str: string) => {
    return str.replace(/\w\S*/g, (t) => {
        return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
    });
};

export default titleCase;