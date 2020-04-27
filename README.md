
    基于vue-cli2.x版本的多目录配置：微前端

    项目背景：
        vue可以创建单页面应用，一个项目有一个src，但是我们有几个项目共用某些公共资源common，并且我们想要实现每个子目录（即子系统）之间可以单独打包和发布，并且还能引用到公共的资源。
        

    技术调研：

        我们使用vue-cli和webpack创建的vue单页面项目，运行时就是一个node进程，并且我们在电脑上运行多个vue项目的时候从页面url的显示上可以看出其实就是同域名下的不同端口在跑对应的项目。现在我们需要多个项目合并成多目录的形式并且每个子目录单独运行和打包，可以理解成多个node子进程运行。具体查看node子进程的文档了解。
        
        webpack多目录配置

            。开发环境下

            所有子目录共用一个build config配置文件，怎么实现适用于所有子目录呢？需要了解webpack的配置，通过命令行运行npm run dev时，本质上是运行build/webpack.dev.conf.js文件，这里面的操作有：
            ~merge(webpack.base.conf.js)
            ~开启一个server服务：                   devserver
            ~使用插件拷贝静态资源static             CopyWebpackPlugin
            ~指定该项目要挂载在哪个index.html文件下: HtmlWebpackPlugin

            webpack.base.conf.js文件中需要改动的地方有：
            ~修改项目入口entry为各个子目录的main.js路径。这样程序就知道到各自的子目录入口解析这个子项目。

            webpack.dev.conf.js文件中需要改动的地方有：
            ~CopyWebpackPlugin中static的from-to改成对应子系统各自的static路径
            ~更改子项目运行时页面url的显示模式成  hostname:port/module/


            。打包
            修改config目录下的build选项配置，
                ~index：指明打包后生成index.html文件的目录结构
                ~assetsRoot：打包后静态资源的根目录，因为要保证每个子目录之间不受影响，所以需要指定各自子目录的名称
                ~assetsPublicPath：每个子项目路径 `${system}`，具体的配置细节根据各自的服务端配置


        config项目配置
            from: path.resolve(__dirname, `../src/${system}/static`),

                npm run dev 运行不成功  子进程打开有关闭的原因：
                    1、入口文件配置错误，改成./src/invite/src/main.js
                    2、资源引用别名
                    3、webpack.dev.conf.js中的static是各自子项目的引用


        
        子目录之间本地缓存共享
            同域名下不同端口的本地缓存跨域访问情况：
            ~cookie可以正常访问。
            ~localstorage和sessionstorage不能访问
            
            如何解决？
            localstorage跨端口无法访问，可以通过nginx代理转发，保证页面上url的表现形式一样就可以共享.
            页面url统一显示成 http://127.0.0.1:90/system/#/的形式。nginx根据system代理转发到该system对应的本地端口上，这样在子目录之间切换时，url的path变化不会影响到本地缓存跨域。
            

            额外需要了解的东西
            devserver运行后app.js这些静态资源的路径--了解webpack的配置，明确打包后js放到哪个文件，需要在nginx中做静态资源代理到对应的端口
            

        子目录系统之间如何进行切换？
            location.href = location.origin + system + "/#/"。通过href切换，同时url上不会产生端口跨域，所以本地缓存均可访问



        其它方案：
            业界内也有成熟的方案singlspa微服务，可以做到多个子系统在同一个项目中显示，并且通过tab页面切换子系统时页面不刷新。node子进程的方式相比之下，子系统之间切换时会刷新页面

    
    实现的效果：
        npm run dev moduleName or all 通过webpack自定义参数的形式输入对应的子系统名称运行对应的子目录或者所有目录运行起来。
        webpack会报错：moduleName dependencies is not found。原因时该命令会将moduleName视为一个依赖。
        
        webpack自定义参数的配置：
            script中："dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js -- --env.name=demo"。但这与我们的期望dev moduleName不一致，所以需要通过node子进程将moduleName传给dev，并可以通过process.argv[process.argv.length - 1].split("=")[1]的方式获取到对应的moduleName。

        


    参考文章；
    
        webpack-dev-server自定义参数，这个问题最终用webpack自带的参数传递给配置文件的方式解决了https://blog.csdn.net/riddle1981/article/details/82871545

        