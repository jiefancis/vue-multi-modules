const { spawn , fork , exec} = require("child_process");

(function main(){
    console.log("process.argv", process.argv)
    let system = process.argv[2]

    if(!system) {
        console.log("必须指定一个目录运行")
        return
    }
    let systems = [];
    if(system == 'all'){
        systems = ["invite", "service"]
    } else {
        systems = [system]
    }

    let promises = systems.map(system => {
        return new Promise((resolve, reject) => {
            
            let _process = exec(`npm run dev -- --env.module=${system}`,{ detached: true },function(error, stdout, stderr) {
                    if(error) console.log(error)   
                    console.log(`stdout   ${stdout}`);
                    console.log(`stderr   ${stderr}`);
            });

            _process.stdout.pipe(process.stdout)
            _process.stderr.pipe(process.stderr)
            
            // let _process = spawn(`npm run dev -- --env.module=${system}`);
            // _process.stdout.on('data', (data)=> {
            //     console.log("stdout", data)
            // })

            // _process.stderr.on("data", (data) => {
            //     console.log("stderr", data)
            // })

            // _process.on("close", (data) => {
            //     console.log("子进程退出close，退出码", data)
            // })
            // _process.on("exit", (data) => {
            //     console.log("exit", data)
            // })

            // _process.on("error", (data) => {
            //     console.log("error", data)
            // })
        })
    })

    Promise.all(promises);

})()