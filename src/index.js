import { observable, observe, autorun, reaction } from 'mobx';

const counterState = observable({
	count: 0,
	message: '안녕하세요!!',
});

const render = function({ count, message }) {
	document.querySelector('.count').innerHTML = `<h1>${count}</h1>`;
	document.querySelector('.message').innerHTML = `<h1>${message}${count === 0 ? '빨리 뭐라도 해볼까요?' : ''}</h1>`;
};

reaction(
	() => counterState.message,
	() => console.log('메세지 값이 바뀜'),
);

const disposer = observe(counterState, 'count', (change) => {
	if (change.newValue === 0 && change.oldValue !== 0) {
		setTimeout(() => {
			counterState.message = '이제 아무것도 안하는건가요?';
		}, 2000);
	}
});

autorun(() => render(counterState));

const init = function() {
	render(counterState);

	document.querySelector('.inc').addEventListener('click', function() {
		counterState.count = counterState.count + 1;
		counterState.message = '증가하겠습니다';
	});

	document.querySelector('.dec').addEventListener('click', function() {
		counterState.count = counterState.count - 1;
		counterState.message = '감소하겠습니다';
	});

	document.querySelector('.reset').addEventListener('click', function() {
		counterState.count = 0;
	});
};

window.onload = function() {
	init();
};
