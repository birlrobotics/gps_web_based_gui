$(function() {
    setup_tag_field()
    console.log(get_iter_tag())    
    console.log(get_sample_type_tag())    
    plot_iterations(
        get_fake_sample_data(10, 5, 100) 
    )
})


function get_fake_sample_data(iteration_number, sample_number, sample_time_T) {

    var iteration_dict = {}
    for (var i = 0; i < iteration_number; i++) {
        iteration_dict[i] = {}
        iteration_dict[i].data = []
        for (j = 0; j < sample_number; j++) {
            var args = {
                x: Array.from({length: sample_time_T}, () => Math.random()),
                y: Array.from({length: sample_time_T}, () => Math.random()),
                z: Array.from({length: sample_time_T}, () => Math.random()),
                mode: 'lines',
                marker: {
                        size: 12,
                        symbol: 'circle',
                    line: {
                        color: 'rgb(0,0,0)',
                        width: 0
                    }
                },
                line: {
                    width: 1
                },
                type: 'scatter3d',
                name: 'iter'+i+'_sample'+j
            }
            iteration_dict[i].data.push(args)
        }
    } 
    return iteration_dict
}
