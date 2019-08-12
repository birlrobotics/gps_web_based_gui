function plot_iterations(iteration_dict){
    var data = JSON.parse(JSON.stringify(iteration_dict[0].data))
    
    var frames = []
    var steps = []
    for (var iter_no in iteration_dict) {
        iter_name = "iter"+iter_no 
        frames.push({
            name: iter_name,
            data: iteration_dict[iter_no].data
        })
        steps.push({
          label: iter_name,
          method: "animate",
          args: [
            [iter_name],
            {
              mode: "immediate",
              frame: { redraw: true, duration: 500 },
              transition: { duration: 500 }
            }
          ]
         })
    }

    var sliders = [
      {
        pad: { t: 30 },
        x: 0.05,
        len: 0.95,
        currentvalue: {
          xanchor: "right",
          font: {
            color: "#888",
            size: 20
          }
        },
        transition: { duration: 500 },
        // By default, animate commands are bound to the most recently animated frame:
        steps: steps,
      }
    ]
    var layout = {
        title: '3D Line Plot',
        autosize: false,
        height: 800,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 65
        },
        scene: {
            aspectmode: "manual", 
            aspectratio: { 
                x: 1, 
                y: 1,
                z: 1,
            }, 
            xaxis: {
                range: [-1, 1],
            },
            yaxis: {
                range: [-1, 1],
            },
            zaxis: {
                range: [-1, 1],
            },
        },
        sliders: sliders,
    };
    Plotly.plot(
        'graph', 
        {
            data:data, 
            layout:layout, 
            frames:frames
        },
    );
}
