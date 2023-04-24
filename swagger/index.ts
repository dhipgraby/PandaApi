import fs from 'fs';
import { join } from 'path';

type SwaggerDoc = {
    paths: Record<string, any>;
};

interface SwaggerDocWithOpenApi extends SwaggerDoc {
    openapi: string;
}

const files = [
    'welcome.json',
    'getUserById.json',
    'register.json',    
    'AiCompletion.json',
];

const swaggerDir = join(__dirname, '..', 'swagger');

const loadSwagger = (): SwaggerDocWithOpenApi => {
    const swaggerDocs: SwaggerDoc[] = files.map((file) => {
        const contents = fs.readFileSync(join(swaggerDir, file), 'utf-8');
        return JSON.parse(contents) as SwaggerDoc;
    });

    const mergedSwagger = swaggerDocs.reduce((acc: SwaggerDoc, doc: SwaggerDoc) => {
        acc.paths = { ...acc.paths, ...doc.paths };
        return acc;
    }, { paths: {} }) as SwaggerDocWithOpenApi;

    // Add the openapi field with a valid version
    mergedSwagger.openapi = '3.0.0';

    return mergedSwagger;
};

export default loadSwagger;
