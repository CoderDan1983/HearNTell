function timeConsumingActivity({ wait = 1000, info }, startTime){
    return new Promise(resolve => {
        setTimeout(async () => {
            const timeSince = Date.now() - startTime;
            const prev = timeSince - wait;
            console.log('timeConsumingActivity says info is: ', info,
             `.  Time since is ${timeSince} = ${prev}(previous) + ${wait}(wait)`);
            if(info.wait){
                const result = await timeConsumingActivity(info, startTime);
                resolve(result);
            }
            else{
                resolve(info);
            }          
        }, wait);
    });
}
async function waitLess({ info, message }){
    let result;
    if(info){
        //console.log('info exists.  message is: ', message)
        result =  await waitLess(info)
    }
    else{
        //console.log('only message exists.  logging: ', message);
        result =  message;
    }
    console.log('weightLess result is: ', result)
    return result;
}

const objW = {
    message: "outermost",
    info: {
        message: "outermedium",
        info: {
            message: "medium",
            info: {
                message: "innermedium",
                info: {
                    message: "innermost",
                }
            }
        }
    }
}

const objS = {
    message: "hey"
}
// async function rundis(){
//     let result = await waitLess(objW);
//     console.log(result);
// }

// rundis()

waitLess(objW);


let timeWatch =  Date.now();
async function bigWaiter(){
    console.log('big waiter! ------------');


    const obj = { 
        wait: 1000, 
        info: { 
            wait: 1500, 
            info: { 
                wait: 2000, 
                info: "bing bong!"
            } 
        }
    }

    await timeConsumingActivity({ wait: 250, info: "blob the builder"}, timeWatch);
    await timeConsumingActivity({ wait: 450, info: "slorb the slilder"}, timeWatch);
    await timeConsumingActivity({ wait: 250, info: "guy the guilder"}, timeWatch);
    await timeConsumingActivity(obj, timeWatch);
    await timeConsumingActivity({ wait: 2500, info: "and then..."}, timeWatch);
    console.log('end big waiter! ---------------')
}

// bigWaiter();





// async function awaiter(info){
//     if(info.info.info){
//         const result = await awaiter(info.info);
//         // console.log('went deeper.  info.info was: ', info.info);
//         return result;
//     }
//     else{
//         const result = await timeConsumingActivity(info);
//         console.log('awaiter returns: ', result);
//         return result;
//     }

// }
// async function awaitAnother(callback, info){
//     console.log('awaitAnother called! callback, info is', callback, info)
//     const result = info ? await callback(info) : await timeConsumingActivity();
//     console.log(result);

//     return result;
// }

    //await awaiter({ wait: 1000, info: "this!"});
    //await awaiter({ info: "should!"});
    // await awaiter({ 
    //     wait: 3245, 
    //     info: { 
    //         wait: 1343, 
    //         info: { 
    //             wait: 444, 
    //             info: "bing bong!"
    //         } 
    //     }
    // });
    //await awaiter({ wait: 99, info: "in!"});
    //await awaiter({ wait: 99, info: "order!"});


// function timeConsumingActivity({ wait = 1000, info }){ //callback
//     return new Promise(resolve => {
//         setTimeout(() => {
//             // if(callback){
//             //     resolve(await callback(info))
//             // }
//             // else{
//                 resolve(info);  
//             //}
            
//         }, wait);
//     });
// }
// // { wait, waitMax, callback, info }
// async function awaiter(info, callback){
//     //console.log('awaiter called!  info is', info, 'callback is: ', callback)
//     if(callback){
//         const result = await callback(info);
//         console.log("awaiter's callback returns: ", result);
//         return result;
//     }
//     else{ 
//         const result = await timeConsumingActivity(info);
//         console.log('awaiter returns: ', result);
//         return result;
//     }
// }




// async function awaiter(callback, argObj){
//     const result = argObj ? await callback(argObj) : await callback();
//     console.log(result);
// }

  // function asyncTestFunct1({ waitMax = 1000, wait, result }){
  //   const waitTime = wait || Math.random() * waitMax;
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(result);
  //     }, waitTime);
  //   });
  // }
  
  // function resolveAfter2Seconds() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('resolved');
  //     }, 2000);
  //   });
  // }