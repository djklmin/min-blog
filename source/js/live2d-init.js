// source/js/live2d-init.js

/**
 * 完整的Live2D看板娘初始化脚本
 * 包含错误处理、重试机制、移动端适配和可访问性支持
 */

// 配置常量
const CONFIG = {
    cssUrl: '/js/waifu.css',
    tipsJsUrl: '/js/waifu-tips.js',
    live2dJsUrl: '/js/live2d.js',
    maxRetries: 3,
    retryDelay: 2000,
    loadTimeout: 10000
};

// 全局状态
let retryCount = 0;
let isInitialized = false;

// 主初始化函数
function initializeLive2D() {
    if (isInitialized) return;
    
    console.log('🎯 开始初始化Live2D看板娘...');
    
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
    try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onerror = () => console.warn('⚠️ CSS加载失败:', url);
        document.head.appendChild(link);
        console.log('✅ CSS加载成功');
    } catch (error) {
        console.error('❌ CSS加载错误:', error);
    }
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
    
    // 设置超时处理
    const timeoutId = setTimeout(() => {
        if (!script.loaded) {
            console.warn('⏰ 加载超时:', src);
            retryLoading();
        }
    }, CONFIG.loadTimeout);
    
    script.onload = function() {
        clearTimeout(timeoutId);
        script.loaded = true;
        console.log('✅ JS加载成功:', src);
        if (callback) callback();
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
            jsonPath: '/live2d_models/lss/LSS.model3.json',
            // 备用模型路径
            homeUrl: 'https://fastly.jsdelivr.net/npm/'
        },
        display: {
            position: 'right',
            width: 220,
            height: 400,
            hOffset: 0,
            vOffset: -20,
            superSample: 2
        },
        mobile: { 
            show: detectMobile(),
            scale: 0.6,
            motion: true
        },
        react: { 
            opacity: 0.9, 
            opacityDefault: 0.7,
            opacityOnHover: 0.9
        },
        dialog: {
            enable: true,
            script: {
                click: [
                    "嘿！欢迎来到我的小窝！✧(≖ ◡ ≖✿)",
                    "这是一个用 Hexo + Ayer 主题搭建的博客~",
                    "欢迎来到这个博客，请多指教！",
                    "希望你能在这里找到有趣的内容！",
                    "有什么想说的可以给我留言哦！"
                ],
                idle: [
                    "今天天气真不错呢...",
                    "好无聊啊，陪我玩会儿嘛~",
                    "你说，我为什么会在这里呢？",
                    "偷偷告诉你，博主最近又在折腾新东西了",
                    "嗯...我在想今晚吃什么好呢？"
                ]
            }
        },
        tools: {
            enable: true,
            items: ["switch-model", "switch-texture", "photo", "info", "quit"]
        },
        // 错误处理配置
        errorHandler: {
            onModelError: function() {
                console.warn('⚠️ 模型加载失败，使用备用模型');
                // 备用模型
                window.live2d_settings.model.jsonPath = 
                    'https://fastly.jsdelivr.net/npm/live2d-widget-model-shizuku@latest/assets/shizuku.model.json';
                initLive2dWidget();
            }
        }
    };

    try {
        initLive2dWidget();
        isInitialized = true;
        console.log('🎉 看板娘初始化成功！');
        
        // 添加可访问性支持
        setTimeout(addAccessibilitySupport, 2000);
        
        // 移动端特殊处理
        if (detectMobile()) {
            setupMobileSupport();
        }
        
    } catch (error) {
        console.error('💥 看板娘初始化失败:', error);
        retryLoading();
    }
}

// 检测移动设备
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// 移动端支持设置
function setupMobileSupport() {
    console.log('📱 移动设备检测，启用触摸支持');
    
    document.addEventListener('touchstart', function() {
        if (window.live2d_widget) {
            try {
                window.live2d_widget.initMobile();
            } catch (e) {
                console.warn('移动端初始化失败:', e);
            }
        }
    });
}

// 可访问性支持
function addAccessibilitySupport() {
    try {
        const waifu = document.getElementById('waifu');
        if (waifu) {
            waifu.setAttribute('aria-label', '交互式看板娘');
            waifu.setAttribute('role', 'application');
            
            // 为按钮添加标题
            const buttons = waifu.querySelectorAll('button, [onclick]');
            buttons.forEach((btn, index) => {
                const titles = ['切换模型', '切换纹理', '拍照', '信息', '退出'];
                btn.setAttribute('title', titles[index] || '功能按钮');
                btn.setAttribute('aria-label', titles[index] || '功能按钮');
            });
            
            // 为图片添加alt
            const images = waifu.querySelectorAll('img');
            images.forEach(img => {
                if (!img.alt) img.alt = '看板娘元素';
            });
        }
    } catch (error) {
        console.warn('可访问性支持设置失败:', error);
    }
}

// 资源加载状态检查
function checkPrerequisites() {
    // 确保不是爬虫之类的
    if (navigator.webdriver) {
        console.log('🤖 检测到自动化工具，跳过看板娘加载');
        return false;
    }
    
    // 检查用户是否禁用JavaScript
    if (!window.JSON || !window.Promise) {
        console.log('🚫 环境不支持现代JavaScript特性');
        return false;
    }
    
    return true;
}

// 启动初始化
if (checkPrerequisites()) {
    // 多种启动方式确保触发
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLive2D);
    } else {
        setTimeout(initializeLive2D, 1000);
    }
    
    // 备用启动机制
    window.addEventListener('load', initializeLive2D);
    setTimeout(initializeLive2D, 3000);
}

// 全局错误处理
window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('live2d')) {
        console.warn('Live2D相关错误:', e.error);
    }
});

// 导出函数用于外部调用（如果需要）
window.Live2DHelper = {
    initialize: initializeLive2D,
    reload: function() {
        isInitialized = false;
        retryCount = 0;
        initializeLive2D();
    }
};
