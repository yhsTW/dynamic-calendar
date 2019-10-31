// 컴포넌트를 정렬한다.
const sortComponents = (order, components) => 
    order.map(type => components[type]);

export default sortComponents;