$("#calculate_button").on('click', main);

window.onload = main;
window.calculation_precision = 1e9;

function main()
{
    out("E stands for Euler\nIE stands for Improved Euler\nRK stands for Runge-Kutta\n");

    let x_start = eval($("#x0_input").val()), y_start = eval($("#y0_input").val()); // y(0) = 1/sqrt(2)
    let X = parseInt($("#X_input").val());
    let N = parseInt($("#N_input").val());
    let n0 = parseInt($("#n0_input").val());

    let max_err_e = {gte: [], lte: []};
    let max_err_ei = {gte: [], lte: []};
    let max_err_rk = {gte: [], lte: []};

    recalc_y_exact(x_start, y_start);

    for (let n = n0; n <= N; n++)
    {
        let e = new EulerNumericalMethod(x_start, y_start, X, n),
            ei = new ImprovedEulerNumericalMethod(x_start, y_start, X, n),
            rk = new RungeKuttaNumericalMethod(x_start, y_start, X, n);

        // max gte & max lte
        let max_e_gte = -Infinity,
            max_ei_gte = -Infinity,
            max_rk_gte = -Infinity,
            max_e_lte = -Infinity,
            max_ei_lte = -Infinity,
            max_rk_lte = -Infinity;
        for (let i = 0; i <= n; i++)
        {
            max_e_gte = Math.max(e.gte[i].y, max_e_gte);
            max_ei_gte = Math.max(ei.gte[i].y, max_ei_gte);
            max_rk_gte = Math.max(rk.gte[i].y, max_rk_gte);
            max_e_lte = Math.max(e.lte[i].y, max_e_lte);
            max_ei_lte = Math.max(ei.lte[i].y, max_ei_lte);
            max_rk_lte = Math.max(rk.lte[i].y, max_rk_lte);
        }
        max_err_e.gte.push({x: n, y: max_e_gte});
        max_err_ei.gte.push({x: n, y: max_ei_gte});
        max_err_rk.gte.push({x: n, y: max_rk_gte});
        max_err_e.lte.push({x: n, y: max_e_lte});
        max_err_ei.lte.push({x: n, y: max_ei_lte});
        max_err_rk.lte.push({x: n, y: max_rk_lte});
    }
    console.log(max_err_rk);

    anim_speed = 750;
    $("#plot_example_img").animate({
        opacity: 0
    }, {
        duration: anim_speed
    });
    $("canvas").animate({
        opacity: 1
    }, {
        duration: anim_speed
    });

    max_x = 100;
    max_y = 10;
    kx = W / 20;
    ky = H * 0.1;
    draw_cs("plot1");
    if ($("#plot_params").val().includes('plot_gte'))
    {
        plot("plot1", max_err_e.gte, "rgba(255,45,62,0.3)");
        plot("plot1", max_err_ei.gte, "rgba(119,113,255,0.3)");
        plot("plot1", max_err_rk.gte, "rgba(39,235,255,0.76)");
    }
    if ($("#plot_params").val().includes('plot_lte'))
    {
        ky = H * 0.1 * 40;
        plot("plot1", max_err_e.lte, "rgba(255,45,62,0.3)");
        plot("plot1", max_err_ei.lte, "rgba(119,113,255,0.3)");
        plot("plot1", max_err_rk.lte, "rgba(39,235,255,0.76)");
    }
}