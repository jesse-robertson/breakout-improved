export default () => ({
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
});