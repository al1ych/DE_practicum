// todo point class

function clear_c(canvas) // clear canvas
{
    let ctx = document.getElementById(canvas).getContext('2d');
    ctx.clearRect(0, 0, document.getElementById(canvas).width, document.getElementById(canvas).height);
}


let default_line_color = "#222";
let font_size = 32; // todo font size
let onplot_precision = 1e3; // precision of numbers drawn on the plot
let line_width = 4;
let gl_min_render_distance = {x: 0, y: 0};

let W = document.getElementById("plot1").width;
let H = document.getElementById("plot1").height;
let kx = W / 3.2;
let ky = H / 1.05;
let max_x = W / kx;
let max_y = H / ky;

let offset = {x: 16, y: 16};
let origin = {x: 0, y: 0};


// optional: dash_spasing, color
function draw_l(canvas, from, to, color, dash_spacing) // draws a line from -> to
{
    let ctx = document.getElementById(canvas).getContext('2d');
    ctx.strokeStyle = color || default_line_color;
    ctx.setLineDash([offset.x, dash_spacing || 0]); // dash_spacing is only for dashed lines
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.moveTo(kx * (from.x - origin.x) + offset.x, H - (ky * (from.y - origin.y) + offset.y));
    ctx.lineTo(kx * (to.x - origin.x) + offset.x, H - (ky * (to.y - origin.y) + offset.y));
    ctx.stroke();
}


function draw_txt(canvas, t, p)
{
    let ctx = document.getElementById(canvas).getContext('2d');
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillRect(kx * p.x + offset.x + 8, H - (ky * p.y + offset.y * 1.3 + 24), 80, 24);
    ctx.fillStyle = "#000";
    ctx.fillText(t, kx * p.x + offset.x + 8, H - (ky * p.y + offset.y * 1.3));
}


function draw_gl(canvas, p) // draws guide lines + text
{
    if (p.x !== 0 && $("#plot_params").val().includes('gl_lines'))
        draw_l(canvas, {x: p.x, y: p.y}, {x: p.x, y: 0}, "rgba(204,204,204,0.18)", offset.x);
    if (p.y !== 0 && $("#plot_params").val().includes('gl_lines'))
        draw_l(canvas, {x: p.x, y: p.y}, {x: 0, y: p.y}, "rgba(204,204,204,0.18)", offset.x);
    if ($("#plot_params").val().includes('gl_text'))
        draw_txt(canvas, Math.round(p.x * onplot_precision) / onplot_precision, {x: p.x, y: 0});
    if ($("#plot_params").val().includes('gl_text'))
        draw_txt(canvas, Math.round(p.y * onplot_precision) / onplot_precision, {x: 0, y: p.y});
}


function draw_cs(canvas) // draw coordinate system
{
    clear_c(canvas);
    draw_l(canvas, origin, {x: max_x, y: 0});
    draw_l(canvas, origin, {x: 0, y: max_y});
}


// optional: graph_color
function plot(canvas, p, graph_color) // plots array of points and connects with lines
{
    for (let i = 0; i < p.length; i++)
    {
        if (i !== 0)
        {
            if (Math.abs(p[i].x - p[i - 1].x) > gl_min_render_distance.x &&
                Math.abs(p[i].y - p[i - 1].y) > gl_min_render_distance.y)
            draw_gl(canvas, p[i]);
            draw_l(canvas, p[i - 1], p[i], graph_color || default_line_color);
        }
        else
        {
            draw_gl(canvas, p[i]);
        }
    }
}