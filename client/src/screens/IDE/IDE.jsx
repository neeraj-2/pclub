import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

function IDE() {
	const [output, setOutput] = useState('');
	const [loading, setLoading] = useState(false);
	const codeRef = useRef(null);
	const inputRef = useRef(null);
	const selectRef = useRef(null);

	useEffect(() => {
		codeRef.current?.addEventListener('keydown', (event) => {
			let _this = codeRef.current;
			let start = _this.selectionStart;
			let end = _this.selectionEnd;
			if (event.key === 'Tab') {
				event.preventDefault();
				_this.value = `${_this.value.substring(
					0,
					start,
				)}\t${_this.value.substring(end)}`;

				_this.selectionEnd = start + 1;
				_this.selectionStart = _this.selectionEnd;
			}
		});
	}, []);

	const mobile = Modernizr.mq('(max-width: 1000px)');
	const handleSubmit = () => {
		setLoading(true);
		fetch('https://ide.webug.space', {
			method: 'POST',
			body: JSON.stringify({
				code: codeRef.current.value,
				input: inputRef.current.value,
				lang: selectRef.current.value,
			}),
		})
			.then((res) => res.text())
			.then((text) => {
				setOutput(text);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	};

	if (mobile) {
		return (
			<div className="flex ide-container center">
				<p>
					phone pe available hi nahi hai!{' '}
					<span role="img" aria-label="smiley">
						🙃
					</span>
				</p>
			</div>
		);
	}

	return (
		<div className="flex ide-container">
			<div className="flex column center spacing-1" style={{ width: '50%' }}>
				<p className="title kepler">Code:</p>
				<textarea
					className="inp mono code-text"
					name="code"
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					ref={codeRef}
					placeholder="Code"
					defaultValue="print('Hello World!')"
				/>
			</div>
			<div className="flex column spacing-1 center" style={{ width: '50%' }}>
				<p className="title kepler">Input:</p>
				<textarea
					className="inp mono input-text"
					name="code"
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					ref={inputRef}
					placeholder="Input"
				/>
				<div className="flex row spacing-1">
					<select ref={selectRef} className="select mono">
						<option value="py">Python 3.6.8</option>
						<option value="cpp">C++ 14</option>
						<option value="c">C</option>
					</select>
					<button
						className={classnames('btn', {
							animate: loading,
						})}
						disabled={loading}
						type="button"
						onClick={handleSubmit}
					>
						Run
					</button>
				</div>
				<p className="title kepler">Output:</p>
				<textarea
					className="inp mono output-text"
					value={output}
					readOnly={true}
					placeholder="Output"
				/>
			</div>
		</div>
	);
}

export default IDE;
