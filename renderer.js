window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js') 
require('materialize-css')
const shell = require('node-powershell')

const testData=[1,2,3,4,5,6,7,8,9]

function loading(){
    const myPreLoader = `
    <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue">
    <div class="circle-clipper left">
        <div class="circle"></div>
    </div><div class="gap-patch">
        <div class="circle"></div>
    </div><div class="circle-clipper right">
        <div class="circle"></div>
    </div>
    </div>`
    $('#myH3').html(myPreLoader)
}

$(document).ready(function(){

    $('#clearBtn').click( () => {
        $('#resultsGoHere').empty()
    })

    $('#test1Btn').click( () => {
        loading()
        let i=0
        let max=testData.length
        let runningTotal=0;
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
            });
        const doPowershell = (val) => {
            ps.addCommand(`write-host ${val}`)
            ps.invoke()
        }
        ps.on('output', output => {
            runningTotal+=parseInt(output)
            $('#resultsGoHere').append(`<div class="chip orange lighten-3 purple-text z-depth-3 text-darken-1 col s2 m2 l2">${output}</div>`)
            if (i<max) {return doPowershell(testData[i++])}else{
                ps.dispose()
                $('#myH3').html('<h2>Done.</h2>')
                $('#resultsGoHere').append(`<div class="chip orange lighten-3 purple-text z-depth-3 text-darken-1 col s2 m2 l2">total:${runningTotal}</div>`)
            }
        })
        doPowershell(testData[i++])
    })
})
