<body>
  <!-- ... -->
  <div id="my-shouts-container"></div>
  <script>
    myQexoShouts.init({
        el: "#my-shouts-container", 
        avatar: "/image/avatar", // 你的头像
        name: "min", // 你的名字
        limit: 5, // 加载几条
        baseURL: "https://vercel.com/flys-projects-dddec0f2/flyminos/CREK9PwPejsiFZYu466B3jFudv3w" // 你的Qexo API地址
    }).catch(function(error) {
        console.error("加载过程中出现问题:", error);
    });
    </script>
</body>
