$(function() {
    setup_tag_field(get_data_from_server)
    get_data_from_server()
})

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function get_data_from_server() {
    var req = {
        json_req: JSON.stringify({
            iter_tag:get_iter_tag(),
            condition_tag:get_condition_tag(),
            sample_type_tag:get_sample_type_tag(),
        }),
        _xsrf: getCookie("_xsrf"),
    }
    $.post(
        "get_plotting_data_in_json", 
        req,
        function(data) {
            var iteration_dict = {}
            for (var iter_no in data) {
                iteration_dict[iter_no] = {}
                iteration_dict[iter_no].data = []
                for (var sample_type in data[iter_no]) {
                    for (var cond_no in data[iter_no][sample_type]) {
                        sample_num = data[iter_no][sample_type][cond_no].length
                        for (var i = 0; i < sample_num; i++) {
                            s = data[iter_no][sample_type][cond_no][i]
                            args = {
                                x: s.x,
                                y: s.y,
                                z: s.z,
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
                                name: 'iter'+iter_no+'_'+sample_type+'_cond'+cond_no+'_sample'+i
                            }
                            iteration_dict[iter_no].data.push(args)
                        }
                    }
                }
            }
            plot_iterations(iteration_dict)
        },
        'json',
    )
}


function get_fake_data(iteration_number, sample_number, sample_time_T) {

    var iteration_dict = {}
    for (var i = 0; i < iteration_number; i++) {
        iteration_dict[i] = {}
        iteration_dict[i].data = []
        for (var j = 0; j < sample_number; j++) {
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
        var args = {
            x: Array.from({length: 1}, () => Math.random()),
            y: Array.from({length: 1}, () => Math.random()),
            z: Array.from({length: 1}, () => Math.random()),
            mode: 'markers',
            marker: {
                    size: 4,
                    symbol: 'circle',
                    color: '#000000',
            },
            line: {
                width: 1
            },
            type: 'scatter3d',
            name: 'target point',
        }
        iteration_dict[i].data.push(args)
    } 
    return iteration_dict
}
