function f(x, y) // y'
{
    return eval($("#f_input").val());
}


function y_exact(x) // y
{
    return eval($("#y_exact_input").val());
}


function euler(x_start, y_start, x_end, iter_count)
{
    let val = [], lte = [], gte = [], x = x_start, y = y_start, h = (x_end - x_start) / iter_count;
    for (let i = 0; i <= iter_count; i++)
    {
        val.push({x, y});

        gte.push({x, y: Math.abs(y_exact(x) - val[i].y)});

        y += h * f(x, y);
        x += h;

        lte.push({x, y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + h * f(x - h, y_exact(x - h))) : 0))});
    }
    return { val, lte, gte };
}


function euler_improved(x_start, y_start, x_end, iter_count)
{
    let val = [], lte = [], gte = [], x = x_start, y = y_start, h = (x_end - x_start) / iter_count;
    for (let i = 0; i <= iter_count; i++)
    {
        val.push({x, y});

        gte.push({x, y: Math.abs(y_exact(x) - val[i].y)});

        let k1 = f(x, y);
        let k2 = f(x + h, y + h * k1);
        y += h * (k1 + k2) / 2;
        x += h;

        lte.push({x, y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + (h / 2) * (f(x - h, y_exact(x - h)) + f(x, y_exact(x - h) + h * (f(x - h, y_exact(x - h)))))) : 0))});
    }
    return { val, lte, gte };
}


function runge_kutta(x_start, y_start, x_end, iter_count)
{
    let val = [], gte = [], lte = [], x = x_start, y = y_start, h = (x_end - x_start) / iter_count;
    for (let i = 0; i <= iter_count; i++)
    {
        val.push({x, y});

        gte.push({x, y: Math.abs(y_exact(x) - val[i].y)});

        let k1 = h * f(x, y);
        let k2 = h * f(x + h / 2, y + k1 / 2);
        let k3 = h * f(x + h / 2, y + k2 / 2);
        let k4 = h * f(x + h, y + k3);

        y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        x += h;

        lte.push({x, y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + (h / 6) * (f(x - h, y_exact(x - h)) + 2 * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h))) + 2 * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h)))) + f(x - h + h, y_exact(x - h) + h * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h))))))) : 0))});
        // gte.push(y_exact(x) - val[i]);
    }
    return { val, lte, gte };
}


function out(s)
{
    $("#raw_output").val($("#raw_output").val() + s + '\n');
}