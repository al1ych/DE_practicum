function f(x, y) // y'
{
    return eval($("#f_input").val());
}


function y_exact(x) // y
{
    return eval($("#y_exact_input").val());
}


// calculates the constant C to then recalc the exact function
// and then recalcs exact solution with new C(x0, y0)
function recalc_y_exact(x0, y0)
{
    if (window.calculation_precision)
    {
        $("#y_exact_input").val($("#y_general_input").val().replace("CONST", Math.round((1 / (y0 * y0) - 1) / Math.exp(-x0 * x0) * calculation_precision) / calculation_precision));
    }
}


// logs text output
function out(s)
{
    $("#raw_output").val($("#raw_output").val() + s + '\n');
}