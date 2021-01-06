// OPTION 1
<input
	name="myImage" // name of input field or fieldName simply
	type="file"
	onChange={() => {
		// console logging selected file from menu
		console.log( event.target.files[0] ) // gives first file

		// setting selected file in state
		setState method with event.target.files[0] as argument
	}}
/>

<button onClick={() => {
	// upload file with axios request
	const formData = new FormData()
	formData.append('set_name_for_file', this.state.selectedFile, this.state.selectedFile.name)
	axios.post('request_url', formData, {
		onUploadProgress: progressEvent => {
			console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
		}
	})
	.then()
	.catch()
}}/>

// OPTION 2
//  make custom file input, input becomes hidden, another button is created which transfers click to input through ref
<input
	style={{display: 'none'}}
	ref={fileInput => (this.fileInput = fileInput) }
	type="file"
	onChange={() => {
		// console logging selected file from menu
		console.log( event.target.files[0] ) // gives first file

		// setting selected file in state
		setState method with event.target.files[0] as argument
	}}
/>

<button onClick={() => this.fileInput.click()} />

<button onClick={() => {
	// upload file with axios request
	const formData = new FormData()
	formData.append('set_name_for_file', this.state.selectedFile, this.state.selectedFile.name)
	axios.post('request_url', formData, {
		onUploadProgress: progressEvent => {
			console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
		}
	})
	.then()
	.catch()
}}/>
