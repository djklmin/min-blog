// source/js/live2d-init.js

// 等待所有资源加载完成
window.addEventListener('load', function() {
    // 动态加载看板娘所需的JS文件
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }
    
    // 按顺序加载JS文件
    loadScript('https://fastly.jsdelivr.net/npm/live2d-widget@latest/lib/ui/waifu-tips.js', function() {
        loadScript('https://fastly.jsdelivr.net/npm/live2d-widget@latest/lib/live2d.js', function() {
            // 所有文件加载完成后初始化
            initLive2DWidget();
        });
    });
    
    function initLive2DWidget() {
        if (typeof initLive2dWidget === 'undefined') {
            console.log('等待看板娘资源加载...');
            setTimeout(initLive2DWidget, 1000);
            return;
        }
        
        // 安全配置
        window.live2d_settings = {
            model: { 
                scale: 1,
                jsonPath: '/live2d_models/lss/LSS.model3.json'
            },
            display: {
                position: 'right',
                width: 220,
                height: 400,
                hOffset: 0,
                vOffset: -20
            },
            mobile: { 
                show: true,
                scale: 0.6
            },
            react: { 
                opacity: 0.9, 
                opacityDefault: 0.7
            },
            dialog: {
                enable: true,
                script: {
                    click: [
                        "嘿！欢迎来到我的小窝！",
                        "这是一个用 Hexo 搭建的博客~",
                        "希望你能在这里找到有趣的内容！"
                    ],
                    idle: [
                        "今天天气真不错呢...",
                        "偷偷告诉你，博主最近又在折腾新东西了"
                    ]
                }
            },
            tools: {
                enable: true,
                items: ["switch-model", "switch-texture", "photo", "info", "quit"]
            }
        };
        
        try {
            initLive2dWidget();
            console.log('看板娘初始化成功！');
        } catch (error) {
            console.error('看板娘初始化失败:', error);
        }
    }
});
