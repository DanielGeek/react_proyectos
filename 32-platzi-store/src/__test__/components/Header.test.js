import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import renderer from 'react-test-renderer';
import Header from '../../components/Header';

describe('<Header />', () => {
  test('Render del componente Header', () => {
    const header = shallow(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );
    expect(header.length).toEqual(1);
  });
  test('Render del Titulo', () => {
    const header = mount(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );
    expect(header.find('.Header-title').text()).toEqual('Platzi Store');
  });
});

describe('Header SnapShot', () => {
  test('Test the Snapshot Header', () => {
    const header = renderer.create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    ).toJSON();
    expect(header).toMatchSnapshot();
  });
});