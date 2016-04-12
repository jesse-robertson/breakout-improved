export default () => ({
    enable : entity => {
        entity.body = {
            bounce: {
                set: () => {}
            }
        };
    },
    startSystem : () => {}
});