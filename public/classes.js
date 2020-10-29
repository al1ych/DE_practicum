class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    distance(P)
    {
        return Math.sqrt(Math.pow(this.x - P.x, 2) - Math.pow(this.y - P.y, 2));
    }
}


class Function
{
    constructor(s)
    {
        this.func = eval(s);
    }
}


class Grid
{
    /**
     * vlg is of the following structure:
     * @param val is comprised of (x[i], y_calculated[i]),
     * @param lte is comprised of (x[i], lte at x[i])
     * @param gte is comprised of (x[i], gte at x[i])
     */

    constructor(val, lte, gte)
    {
        if (val === undefined)
        {
            this.val = [];
        }
        else
        {
            this.val = val;
        }
        if (lte === undefined)
        {
            this.lte = [];
        }
        else
        {
            this.lte = lte;
        }
        if (gte === undefined)
        {
            this.gte = [];
        }
        else
        {
            this.gte = gte;
        }
    }
}


class NumericalMethod
{
    constructor(grid)
    {
        if (grid === undefined)
        {
            this.grid = new Grid();
        }
        else
        {
            this.grid = grid;
        }
    }
}


class EulerNumericalMethod extends NumericalMethod
{
    /**
     * euler approximation method
     *
     returns
     * @param x_start
     * @param y_start
     * @param x_end
     * @param iter_count
     * @return {Grid}
     */
    constructor(x_start, y_start, x_end, iter_count)
    {
        super();
        let val = [], lte = [], gte = [], x = x_start, y = y_start, h = (x_end - x_start) / iter_count;
        for (let i = 0; i <= iter_count; i++)
        {
            val.push({x, y});

            gte.push({x, y: Math.abs(y_exact(x) - val[i].y)});

            y += h * f(x, y);
            x += h;

            lte.push({x, y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + h * f(x - h, y_exact(x - h))) : 0))});
        }
        this.grid = new Grid(val, lte, gte);
        return this.grid;
    }
}


class ImprovedEulerNumericalMethod extends NumericalMethod
{
    /**
     * euler approximation method
     *
     returns
     * @param x_start
     * @param y_start
     * @param x_end
     * @param iter_count
     * @return {Grid}
     */
    constructor(x_start, y_start, x_end, iter_count)
    {
        super();
        let val = [], lte = [], gte = [], x = x_start, y = y_start, h = (x_end - x_start) / iter_count;
        for (let i = 0; i <= iter_count; i++)
        {
            val.push({x, y});

            gte.push({x, y: Math.abs(y_exact(x) - val[i].y)});

            let k1 = f(x, y);
            let k2 = f(x + h, y + h * k1);
            y += h * (k1 + k2) / 2;
            x += h;

            lte.push({
                x,
                y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + (h / 2) * (f(x - h, y_exact(x - h)) + f(x, y_exact(x - h) + h * (f(x - h, y_exact(x - h)))))) : 0))
            });
        }
        this.grid = new Grid(val, lte, gte);
        return this.grid;
    }
}


class RungeKuttaNumericalMethod extends NumericalMethod
{

    /**
     * RungeKutta approximation numerical method
     *
     * @param x_start
     * @param y_start
     * @param x_end
     * @param iter_count
     * @return {Grid}
     */
    constructor(x_start, y_start, x_end, iter_count)
    {
        super();
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

            lte.push({
                x,
                y: Math.abs((i ? y_exact(x) - (y_exact(x - h) + (h / 6) * (f(x - h, y_exact(x - h)) + 2 * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h))) + 2 * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h)))) + f(x - h + h, y_exact(x - h) + h * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h / 2, y_exact(x - h) + (h / 2) * f(x - h, y_exact(x - h))))))) : 0))
            });
            // gte.push(y_exact(x) - val[i]);
        }
        this.grid = new Grid(val, lte, gte);
        return this.grid;
    }
}