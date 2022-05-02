# 多模块

**这是一个基于vue-cli2.x与webpack的多模块架构，旨在实现本地开发调式与生产保持一致**


**项目组织架构**
	build
	config
        conf.js -- 对应子系统的本地运行端口配置
	src
		common--各个子系统的公共资源
		invite
			src
				assets
				pages/views
				router
				main.js
			static
			index.html
		service
			src
				assets
				pages/views
				router
				main.js
			static
			index.html
	build.js -- 重新定义的npm run build指令运行文件
	dev.js   -- npm run dev 本地运行文件


**期望**
    npm run dev 子系统名字 / all 运行该子系统或者将所有子系统全部吊起来运行
    npm run build 子系统名字 / all 打包该子系统或者将所有子系统全部并行打包

