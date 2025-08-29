// source/js/live2d-init.js

/**
 * Live2D看板娘本地初始化脚本
 * 使用本地文件，避免CDN问题
 */

const CONFIG = {
    // 本地文件路径
    cssUrl: '/js/waifu.css',
    tipsJsUrl: '/js/waifu-tips.js',
    live2dJsUrl: '/js/live2d.js',
    maxRetries: 2,
    retryDelay: 1000
};

let isInitialized = false;
let retryCount = 0;

// 主初始化函数
function initializeLive2D() {
    if (isInitialized) return;
    
    console.log('🎯 开始初始化Live2D看板娘（本地模式）...');
    
    // 加载CSS
    loadCSS(CONFIG.cssUrl);
    
    // 按顺序加载JS文件
    loadScript(CONFIG.tipsJsUrl, function() {
        loadScript(CONFIG.live2dJsUrl, function() {
            initLive2DWidget();
        });
    });
}

// 加载CSS文件
function loadCSS(url) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
            console.log('✅ CSS加载成功:', url);
            resolve();
        };
        link.onerror = () => {
            console.warn('⚠️ CSS加载失败:', url);
            resolve(); // CSS失败不影响主要功能
        };
        document.head.appendChild(link);
    });
}

// 加载JS文件
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    
    script.onload = function() {
        console.log('✅ JS加载成功:', src);
        if (callback) callback();
    };
    
    script.onerror = function() {
        console.error('❌ JS加载失败:', src);
        retryLoading();
    };
    
    document.head.appendChild(script);
}

// 重试机制
function retryLoading() {
    if (retryCount >= CONFIG.maxRetries) {
        console.error('🚫 达到最大重试次数，放弃加载看板娘');
        return;
    }
    
    retryCount++;
    console.log(`🔄 第 ${retryCount} 次重试...`);
    
    setTimeout(() => {
        initializeLive2D();
    }, CONFIG.retryDelay * retryCount);
}

// 初始化看板娘组件
function initLive2DWidget() {
    if (isInitialized) return;
    
    if (typeof initLive2dWidget === 'undefined') {
        console.log('⏳ 等待initLive2dWidget函数就绪...');
        setTimeout(initLive2DWidget, 1000);
        return;
    }

    // 完整配置
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
            show: detectMobile(),
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
        isInitialized = true;
        console.log('🎉 看板娘初始化成功！');
        
    } catch (error) {
        console.error('💥 看板娘初始化失败:', error);
    }
}

// 检测移动设备
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// 启动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLive2D);
} else {
    setTimeout(initializeLive2D, 1000);
}

// 备用启动
window.addEventListener('load', initializeLive2D);
