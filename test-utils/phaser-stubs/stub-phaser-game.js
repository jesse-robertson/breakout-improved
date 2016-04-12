export default () => ({
    cache: {
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
    },
    add: {
        text: () => ({
            anchor: { 
                setTo: () => {} 
            }
        }),
        existing: () => {},
        tileSprite: () => {},
        sprite: () => ({
            anchor: { 
                setTo: () => {} 
            }
        }),
        group: () => ({
            create: () => ({
                body: {
                    bounce: {
                        set: () => {}
                    }
                }
            })
        })
    },
    physics: {
        enable : entity => {
            entity.body = {
                bounce: {
                    set: () => {}
                }
            };
        },
        startSystem : () => {}
    },
    onPause: {
        add: () => {}
    },
    onResume: {
        add: () => {}
    },
    world:{},
    input: {
        onDown: {
            add: () => {}
        },
        keyboard: {
            addCallbacks: () => {}
        }
    } 
});