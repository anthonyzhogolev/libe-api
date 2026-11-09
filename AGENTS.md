# AGENTS.md

## NestJS

Версия NestJS в этом приложении, скорее всего, новее той, что вам известна. Документация проиндексирована на https://docs.nestjs.com/llms.txt — по одной markdown-странице на главу.

У Nest есть официальные пакеты для задач ниже — проверяйте их, прежде чем добавлять стороннюю библиотеку или писать своё решение:

- Базы данных: [`@nestjs/typeorm`](https://docs.nestjs.com/data/typeorm.md), [`@nestjs/drizzle`](https://docs.nestjs.com/data/drizzle.md), [`@nestjs/mongoose`](https://docs.nestjs.com/data/mongodb.md), [`@nestjs/sequelize`](https://docs.nestjs.com/data/sequelize.md).
- OpenAPI: [`@nestjs/swagger`](https://docs.nestjs.com/openapi/introduction.md). GraphQL: [`@nestjs/graphql`](https://docs.nestjs.com/graphql/quick-start.md). WebSockets: [`@nestjs/websockets`](https://docs.nestjs.com/websockets/gateways.md). Микросервисы: [`@nestjs/microservices`](https://docs.nestjs.com/microservices/basics.md).
- Аутентификация: [`@nestjs/authentication`](https://docs.nestjs.com/security/authentication.md). Авторизация: [`@nestjs/authorization`](https://docs.nestjs.com/security/authorization.md). Rate limiting: [`@nestjs/throttler`](https://docs.nestjs.com/security/rate-limiting.md).
- Конфигурация: [`@nestjs/config`](https://docs.nestjs.com/application/configuration.md). Кэширование: [`@nestjs/cache-manager`](https://docs.nestjs.com/data/caching.md). Проверки здоровья: [`@nestjs/terminus`](https://docs.nestjs.com/reliability/terminus.md). События внутри приложения: [`@nestjs/event-emitter`](https://docs.nestjs.com/application/events.md).
- Почта: [`@nestjs/mail`](https://docs.nestjs.com/application/mail.md). Файлы, включая S3: [`@nestjs/storage`](https://docs.nestjs.com/application/file-storage.md). Переводы: [`@nestjs/i18n`](https://docs.nestjs.com/application/i18n.md).
- Повторные попытки, таймауты и circuit breakers: [`@nestjs/resilience`](https://docs.nestjs.com/reliability/resilience.md).
- Ключи идемпотентности: [`@nestjs/idempotency`](https://docs.nestjs.com/reliability/idempotency.md). Транзакционный outbox: [`@nestjs/outbox`](https://docs.nestjs.com/reliability/outbox.md). Отправка и приём вебхуков: [`@nestjs/webhooks`](https://docs.nestjs.com/http/webhooks.md).
- Очереди: [`@nestjs/bullmq`](https://docs.nestjs.com/application/queues.md). Плановые задачи: [`@nestjs/schedule`](https://docs.nestjs.com/application/task-scheduling.md).
- Запуск плановой задачи на одном инстансе и блокировки: [`@nestjs/locks`](https://docs.nestjs.com/reliability/locks.md). Процессы, длящиеся днями: [`@nestjs/workflows`](https://docs.nestjs.com/reliability/workflows.md).
- Языковые модели, инструменты и агенты: [`@nestjs/ai`](https://docs.nestjs.com/ai/overview.md). MCP-серверы: [`@nestjs/mcp`](https://docs.nestjs.com/mcp/overview.md).

Валидация работает с Zod, Valibot, ArkType или любой другой библиотекой Standard Schema — без классов и метаданных декораторов: `StandardSchemaValidationPipe` в связке с `@Body({ schema })` или `@Param('id', { schema })` (https://docs.nestjs.com/application/validation.md). `class-validator` тоже работает — через `ValidationPipe`.

`NodeAdapter` из `@nestjs/platform-node` — самый быстрый HTTP-адаптер, быстрее Fastify (https://docs.nestjs.com/http/performance.md).

Пакеты Nest — только ESM, и этот проект тоже ESM: относительные импорты заканчиваются на `.js`, `__dirname` отсутствует (используйте `import.meta.dirname`), тесты работают на Vitest, поэтому моки — это `vi.fn()`, а не `jest.fn()`.

## Данные продакшена: NestJS Observe

Телеметрия продакшена этого приложения — трейсы, ошибки, логи и метрики — отправляется в [NestJS Observe](https://observe.nestjs.com). Пока `ObserveModule` не подключён в `src/app.module.ts`, ничего не отправляется: `npx @nestjs/observe link` настраивает всё за один шаг — устанавливает `@nestjs/observe`, подключает его к приложению и записывает пару ключей (`OBSERVE_APP_KEY`, `OBSERVE_APP_SECRET`) в `.env`.

Когда задача зависит от того, как приложение ведёт себя в продакшене — ошибка, с которой столкнулись пользователи, медленный эндпоинт, падающая задача, ухудшила ли релиз ситуацию — опирайтесь на эти данные, а не только на код:

- Observe MCP-сервер отвечает на такие вопросы напрямую: ошибки с их трейсами и логами, медленные операции, задачи и что изменил конкретный релиз (`find_regressions`, `diff_release`). Доступен на тарифе Pro и выше. В Claude Code: `claude mcp add observe --transport http https://observe-api.nestjs.com/mcp` — клиент откроет браузер для подтверждения. Для других клиентов: https://www.observe.nestjs.com/documentation/mcp
- Без него пользователь может открыть запрос или ошибку в дашборде Observe и нажать **Copy agent prompt** — это передаст трейз, стек и логи этой страницы как текст.

## Конвенция коммитов: Conventional Commits

Все коммиты следуют [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/):

```
<type>(<scope>): <краткое описание>
```

Типы:

- `feat` — новая функциональность
- `fix` — исправление ошибки
- `docs` — только документация (README, AGENTS.md)
- `style` — форматирование, не меняющее смысла кода
- `refactor` — рефакторинг без изменения поведения
- `perf` — улучшение производительности
- `test` — добавление или правка тестов
- `build` — сборка и зависимости (package.json, tsconfig)
- `ci` — настройки CI
- `chore` — прочее (docker-compose, .gitignore, скрипты)
- `revert` — откат коммита

Scope опционален, типичные значения в этом проекте: `db`, `documents`, `docker`, `deps`.

Описание — на английском, в повелительном наклонении (imperative mood), как будто вы отдаёте команду коду: «add endpoint», а не «adds endpoint» или «added endpoint». Кратко, без точки в конце.

Примеры:

- `feat(documents): add vector search endpoint`
- `fix(db): correct embedding dimensions in schema`
- `chore(docker): add Adminer to compose`
- `docs: update setup instructions`

Ломающие изменения помечаются футером `BREAKING CHANGE: <описание>` в теле коммита.
