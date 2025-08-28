---
permalink: false
---
<footer class="footer">
  <div class="outer">
    <ul>
      <li>
        Copyrights &copy;
        <% if (theme.since && !isNaN(theme.since) && theme.since < date(new Date(), 'YYYY')) { %><%- theme.since%>-<% } %><%= date(new Date(), 'YYYY') %>
        <i class="ri-heart-fill heart_icon"></i> <%= config.author || config.title %>
      </li>
    </ul>
    
    <!-- 优化后的统计信息显示 -->
    <ul>
      <li style="margin: 4px 0; line-height: 1.2;">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; align-items: center; font-size: 0.9em;">
          <span style="display: inline-flex; align-items: center; gap: 3px;">
            <i class="ri-time-line" style="color: #ff6b6b; font-size: 0.95em;"></i>
            <span style="color: #666;">稳定运行</span>
            <span id="site-running-days" style="color: #ff6b6b; font-weight: 600;">0</span>
            <span style="color: #666;">天</span>
          </span>
          
          <span style="color: #ddd;">•</span>
          
          <span style="display: inline-flex; align-items: center; gap: 3px;">
            <i class="ri-eye-line" style="color: #4ecdc4; font-size: 0.95em;"></i>
            <span style="color: #666;">访问量</span>
            <span id="site-total-pv" style="color: #4ecdc4; font-weight: 600;">0</span>
          </span>
          
          <span style="color: #ddd;">•</span>
          
          <span style="display: inline-flex; align-items: center; gap: 3px;">
            <i class="ri-user-line" style="color: #45b7d1; font-size: 0.95em;"></i>
            <span style="color: #666;">访客数</span>
            <span id="site-total-uv" style="color: #45b7d1; font-weight: 600;">0</span>
          </span>
        </div>
      </li>
    </ul>
    
    <ul>
      <li>
        <% if (theme.pageFooter){ %>
        <% var hexoLink = '<a href="https://hexo.io" target="_blank">Hexo</a>'; %>
        <% var themeLink = '<a href="https://github.com/Shen-Yu/hexo-theme-ayer" target="_blank">Ayer</a>'; %>
        <%- __('powered_by', hexoLink) %>
        <span class="division">|</span>
        <%- __('theme', themeLink) %>
        <% } %>
      </li>
    </ul>
    
    <ul>
      <li>
        <% if (theme.busuanzi && theme.busuanzi.enable){ %>
        <%# "不蒜子统计" %>
        <%- partial('post/busuanzi') %>
        <% } %>
      </li>
    </ul>
    
    <ul>
      <% if (theme.icp&&theme.icp.enable){ %>
        <li>
          <a href="<%= theme.icp.url %>" target="_black" rel="nofollow"><%= theme.icp.text %></a>
        </li>
        <% } %>
    </ul>
    
    <ul>
      <% if (theme.gongan&&theme.gongan.enable){ %>
      <li>
          <img src="<%= theme.gongan.img %>" style="height: 16px; vertical-align: middle; margin-right: 5px;">
          <a href="<%= theme.gongan.url %>" target="_black" rel="nofollow" style="font-size: 0.9em;"><%= theme.gongan.text %></a>
      </li>
        <% } %>
    </ul>
  </div>
</footer>

<% if (theme.busuanzi && theme.busuanzi.enable){ %>
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<% } %>

<!-- 本地统计脚本 -->
<script>
// 本地访问统计系统
(function() {
  // 获取显示元素
  const daysElement = document.getElementById('site-running-days');
  const pvElement = document.getElementById('site-total-pv');
  const uvElement = document.getElementById('site-total-uv');
  
  if (!daysElement || !pvElement || !uvElement) return;
  
  // 初始化统计数据
  let stats = {
    firstVisit: null,
    totalPV: 0,
    totalUV: 0,
    lastVisit: null
  };
  
  // 尝试从LocalStorage获取现有数据
  try {
    const savedStats = localStorage.getItem('site_stats');
    if (savedStats) {
      stats = JSON.parse(savedStats);
    }
  } catch (e) {
    console.log('LocalStorage读取失败，初始化新统计');
  }
  
  // 处理当前访问
  const now = new Date();
  const today = now.toDateString();
  
  // 如果是第一次访问
  if (!stats.firstVisit) {
    stats.firstVisit = new Date('2025-08-20').getTime();
  }
  
  // 更新PV（页面访问量）
  stats.totalPV += 1;
  
  // 更新UV（独立访客）- 基于当天是否访问过
  try {
    const lastVisitDate = localStorage.getItem('last_visit_date');
    if (lastVisitDate !== today) {
      stats.totalUV += 1;
      localStorage.setItem('last_visit_date', today);
    }
  } catch (e) {
    // LocalStorage可能被禁用
    stats.totalUV += 1;
  }
  
  stats.lastVisit = now.getTime();
  
  // 保存更新后的统计数据
  try {
    localStorage.setItem('site_stats', JSON.stringify(stats));
  } catch (e) {
    console.log('LocalStorage存储失败');
  }
  
  // 计算运行天数（从固定的2025年8月20日开始计算）
  const siteCreationDate = new Date('2025-08-20');
  const runningDays = Math.floor((now - siteCreationDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // 确保天数不为负数
  const finalRunningDays = Math.max(1, runningDays);
  
  // 更新显示
  daysElement.textContent = finalRunningDays;
  pvElement.textContent = stats.totalPV;
  uvElement.textContent = stats.totalUV;
})();
</script>

<!-- 响应式样式调整 -->
<style>
@media (max-width: 768px) {
  .footer .outer ul li {
    margin: 3px 0;
  }
  
  .footer .outer ul li div {
    gap: 8px;
    font-size: 0.85em;
  }
  
  .footer .outer ul li span {
    gap: 2px;
  }
}

@media (max-width: 480px) {
  .footer .outer ul li div {
    gap: 6px;
    font-size: 0.8em;
  }
  
  .footer .outer ul li span {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>