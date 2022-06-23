const BaseRepository = require('../../../bot_modules/repository/base_repository');

test('GET on mocker API should result on response', () => {
    BaseRepository().worker("GET")
    expect(calculator.add('1')).toBe(1);
});