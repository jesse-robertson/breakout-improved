export default {
    controls: {
        mouse: {
            edgeBuffer: {
                x: 24
            }
        }  
    },
    assets: {
        mainAtlas: {
            key: 'breakout',
            textureUrl: 'img/breakout-spritemap.png',
            atlasUrl: 'img/breakout-spritemap.json'
        },
        background: {
            key: 'starfield',
            textureUrl: 'img/starfield-background.jpg'
        }
    },
    elements: {
        bricks: {
            x: 120,
            y: 100,
            rows: 4,
            columns: 15,
            cellWidth: 36,
            cellHeight: 52
        }
    }
};