$("#calculate_button").on('click', main);

// window.onload = main;

function main()
{
    out("E stands for Euler\nIE stands for Improved Euler\nRK stands for Runge-Kutta\n");

    let x_start = eval($("#x0_input").val()), y_start = eval($("#y0_input").val()); // y(0) = 1/sqrt(2)
    let X = parseInt($("#X_input").val());
    let N = parseInt($("#N_input").val());
    let h = (X - x_start) / N;

    let x = x_start,
        y = y_start,
        e = euler(x_start, y_start, X, N),
        ei = euler_improved(x_start, y_start, X, N),
        rk = runge_kutta(x_start, y_start, X, N),
        exact = [];

    out("step: " + h);
    for (let i = 0; i <= N; i++)
    {
        exact.push({x: x, y: y_exact(x)});

        out("\nx: " + x);
        out("y_E: " + e.val[i].y);
        out("y_IE: " + ei.val[i].y);
        out("y_RK: " + rk.val[i].y);
        out("y_exact: " + exact[i].y);
        out("GTE_E: " + e.gte[i].y);
        out("GTE_IE: " + ei.gte[i].y);
        out("GTE_RK: " + rk.gte[i].y);
        out("LTE_E: " + e.lte[i].y);
        out("LTE_IE: " + ei.lte[i].y);
        out("LTE_RK: " + rk.lte[i].y);

        x += h;
    }

    anim_speed = 750;
    $("#plot_example_img").animate({
        opacity: 0
    }, {
        duration: anim_speed
    });
    $("canvas, textarea").animate({
        opacity: 1
    }, {
        duration: anim_speed
    });


    ky = H / 1.05 * 1;
    draw_cs("plot1");
    draw_cs("plot2");
    plot("plot1", exact, "rgba(0,0,0,0.7)");
    plot("plot1", e.val, "rgba(255,45,62,0.3)");
    plot("plot1", ei.val, "rgba(119,113,255,0.3)");
    plot("plot1", rk.val, "rgba(39,235,255,0.3)");

    ky = H / 1.05 * 30;
    if ($("#plot_params").val().includes('plot_gte'))
    {
        plot("plot2", e.gte, "rgba(255,45,62,0.3)");
        plot("plot2", ei.gte, "rgba(119,113,255,0.3)");
        plot("plot2", rk.gte, "rgba(39,235,255,0.76)");
    }
    if ($("#plot_params").val().includes('plot_lte'))
    {
        plot("plot2", e.lte, "rgba(255,45,62,0.3)");
        plot("plot2", ei.lte, "rgba(119,113,255,0.3)");
        plot("plot2", rk.lte, "rgba(39,235,255,0.76)");
    }
}