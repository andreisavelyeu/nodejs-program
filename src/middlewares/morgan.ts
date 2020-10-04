import { TokenIndexer, token } from 'morgan';
import { Request, Response } from 'express';
import chalk from 'chalk';

const normalizeSensitiveData = (
    body: Record<string, unknown>,
    sensitiveKey: string | Array<string>
) => {
    if (Array.isArray(sensitiveKey)) {
        const normalizedData = sensitiveKey.reduce((prev, next) => {
            prev[next] = body[next];
            if (next in body) {
                prev[next] = `fake ${next}`;
                return prev;
            }
            return prev;
        }, {});
        return { ...body, ...normalizedData };
    }
    return { ...body, [sensitiveKey]: `fake ${sensitiveKey}` };
};

token('args', (req: Request) => {
    const { body, query } = req;
    console.log(query);
    return Object.keys(body).length
        ? `body: ${JSON.stringify(normalizeSensitiveData(body, 'password'))}`
        : Object.keys(query).length
        ? `query: ${JSON.stringify(query)}`
        : 'empty';
});

export const morganConfig = (
    tokens: TokenIndexer,
    req: Request,
    res: Response
): string =>
    `method: ${chalk.cyan(tokens.method(req, res))} url: ${chalk.magenta(
        tokens.url(req, res)
    )} arguments: ${chalk.yellowBright(
        tokens.args(req, res)
    )} time: ${chalk.blueBright(tokens.date(req, res))}`;
