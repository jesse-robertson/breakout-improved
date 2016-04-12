export default () => ({
    getImage: () => ({
        key: null, 
        base: {
            hasLoaded: true
        }, 
        frameData: {
            getFrameIndexes: () => [],
            getFrameByName: () => false,
            getFrame: () => false
        }
    })
});