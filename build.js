const { exec } = require("child_process");

(function main(){
    let argv = process.argv[2];
    if( !argv || !argv.trim() ) {
        console.log("最少选择一个子目录构建")
        return 
    }

    let systems,
        alls = ["invite", "service"];
    
    if(argv.toLowerCase() === "all") {
        systems = alls;
    } else if(!alls.includes(argv)){
        console.log("构建的系统名称不存在")
        return
    } else {
        systems = [argv]
    }

    let promises = new Promise((resolve, reject) => {
        return systems.map(system => {
            let _process =  exec(`node build/build.js -- --env.name=${system}`, {detached: true}, function(error, stdout, stderr) {
                if(error) {
                    console.log("build - error" , error)
                    return
                }
                console.log("build - stdout", stdout)
                console.log("build - stderr", stderr);

            })

            _process.stdout.pipe(process.stdout)
            _process.stderr.pipe(process.stderr)
        })
    })

    Promise.all(Array.from(promises)) // 直接使用 Promise.all(promises) 报 #Promise is not iterable所以转成数组
})()