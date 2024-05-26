
export const checkUser = (use, pass) => (users.reduce((a, v) =>
    use === v.username && pass === v.password ? v : a
));

