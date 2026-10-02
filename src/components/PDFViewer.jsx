import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PDFViewer({ file, title, onClose }) {
    const [pdfDocument, setPdfDocument] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [viewMode, setViewMode] = useState('single');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const canvasRefs = useRef([]);
    const pageRefs = useRef([]);

    useEffect(() => {
        if (!file) return;

        let cancelled = false;

        async function loadPDF() {
            try {
                setLoading(true);
                setError('');

                const loadingTask = pdfjsLib.getDocument({
                    url: file
                });

                const pdf = await loadingTask.promise;

                if (cancelled) return;

                setPdfDocument(pdf);
                setPageCount(pdf.numPages);

            } catch (err) {
                console.error('PDF loading error:', err);

                if (!cancelled) {
                    setError(
                        err?.message ||
                        'Unable to load this PDF.'
                    );
                }

            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadPDF();

        return () => {
            cancelled = true;
        };
    }, [file]);


    useEffect(() => {
        if (!pdfDocument) return;

        renderPages();
    }, [
        pdfDocument,
        zoom,
        rotation,
        viewMode
    ]);


    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === '+' || event.key === '=') {
                zoomIn();
            }

            if (event.key === '-') {
                zoomOut();
            }
        }

        document.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [onClose]);


    async function renderPages() {
        if (!pdfDocument) return;

        for (
            let pageNumber = 1;
            pageNumber <= pageCount;
            pageNumber++
        ) {
            const canvas =
                canvasRefs.current[pageNumber - 1];

            if (!canvas) continue;

            const page =
                await pdfDocument.getPage(
                    pageNumber
                );

            const viewport =
                page.getViewport({
                    scale: zoom / 100,
                    rotation
                });

            const outputScale =
                window.devicePixelRatio || 1;

            const context =
                canvas.getContext('2d');

            canvas.width =
                Math.floor(
                    viewport.width * outputScale
                );

            canvas.height =
                Math.floor(
                    viewport.height * outputScale
                );

            canvas.style.width =
                `${viewport.width}px`;

            canvas.style.height =
                `${viewport.height}px`;

            const transform =
                outputScale !== 1
                    ? [
                        outputScale,
                        0,
                        0,
                        outputScale,
                        0,
                        0
                    ]
                    : null;

            await page.render({
                canvasContext: context,
                viewport,
                transform
            }).promise;
        }
    }


    function zoomIn() {
        setZoom((current) =>
            Math.min(current + 25, 250)
        );
    }


    function zoomOut() {
        setZoom((current) =>
            Math.max(current - 25, 50)
        );
    }


    function resetZoom() {
        setZoom(100);
    }


    function rotatePDF() {
        setRotation((current) =>
            (current + 90) % 360
        );
    }


    function toggleViewMode() {
        setViewMode((current) =>
            current === 'single'
                ? 'two'
                : 'single'
        );
    }


    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }


    function handleDownload() {
        const link =
            document.createElement('a');

        link.href = file;

        link.download =
            file.split('/').pop() ||
            'document.pdf';

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }


    function handlePrint() {
        const printWindow =
            window.open(file, '_blank');

        if (!printWindow) return;

        printWindow.addEventListener(
            'load',
            () => {
                printWindow.print();
            }
        );
    }


    function handleSearch(event) {
        const value =
            event.target.value;

        setSearchTerm(value);

        if (
            !pdfDocument ||
            !value.trim()
        ) {
            return;
        }

        searchPDF(value);
    }


    async function searchPDF(term) {
        const normalizedTerm =
            term.toLowerCase();

        for (
            let pageNumber = 1;
            pageNumber <= pageCount;
            pageNumber++
        ) {
            const page =
                await pdfDocument.getPage(
                    pageNumber
                );

            const textContent =
                await page.getTextContent();

            const pageText =
                textContent.items
                    .map((item) => item.str)
                    .join(' ')
                    .toLowerCase();

            if (
                pageText.includes(
                    normalizedTerm
                )
            ) {
                pageRefs.current[
                    pageNumber - 1
                ]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                return;
            }
        }
    }


    if (!file) {
        return null;
    }


    return (
        <div
            className="pdf-viewer"
            onMouseDown={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`PDF preview for ${title}`}
        >

            <div className="pdf-viewer-panel">

                {/* TOOLBAR */}

                <div className="pdf-viewer-toolbar">

                    <div className="pdf-viewer-zoom-controls">

                        <button
                            type="button"
                            className="pdf-viewer-control"
                            onClick={zoomOut}
                            disabled={zoom <= 50}
                            aria-label="Zoom out"
                            title="Zoom out"
                        >
                            −
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-zoom-value"
                            onClick={resetZoom}
                            aria-label="Reset zoom to 100 percent"
                            title="Reset zoom"
                        >
                            {zoom}%
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-control"
                            onClick={zoomIn}
                            disabled={zoom >= 250}
                            aria-label="Zoom in"
                            title="Zoom in"
                        >
                            +
                        </button>

                    </div>


                    <div className="pdf-viewer-toolbar-actions">
                        <button
                            type="button"
                            className="pdf-viewer-tool"
                            onClick={rotatePDF}
                            aria-label="Rotate PDF"
                            title="Rotate PDF"
                        >
                            <span className="pdf-tool-icon">↻</span>
                        </button>

                        <button
                            type="button"
                            className={`pdf-viewer-tool ${searchOpen ? 'active' : ''
                                }`}
                            onClick={() =>
                                setSearchOpen(
                                    (current) => !current
                                )
                            }
                            aria-label="Search PDF"
                            title="Search PDF"
                        >
                            <span className="pdf-tool-icon">⌕</span>
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-tool"
                            onClick={toggleViewMode}
                            aria-label="Toggle single or two page view"
                            title={
                                viewMode === 'single'
                                    ? 'Two-page view'
                                    : 'Single-page view'
                            }
                        >
                            <span className="pdf-tool-icon">
                                {viewMode === 'single'
                                    ? '▣'
                                    : '▣▣'}
                            </span>
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-tool"
                            onClick={handlePrint}
                            aria-label="Print PDF"
                            title="Print PDF"
                        >
                            <span className="pdf-tool-icon">🖨</span>
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-tool"
                            onClick={handleDownload}
                            aria-label="Download PDF"
                            title="Download PDF"
                        >
                            <span className="pdf-tool-icon">↓</span>
                        </button>

                        <button
                            type="button"
                            className="pdf-viewer-close"
                            onClick={onClose}
                            aria-label="Close PDF viewer"
                            title="Close"
                        >
                            ×
                        </button>

                    </div>

                </div>

                {searchOpen && (
                    <div className="pdf-viewer-search">

                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search PDF..."
                            autoFocus
                        />

                    </div>
                )}

                <div className="pdf-viewer-content">

                    {loading && (
                        <div className="pdf-viewer-status">
                            Loading PDF...
                        </div>
                    )}


                    {error && (
                        <div className="pdf-viewer-status pdf-viewer-error">
                            {error}
                        </div>
                    )}


                    {!loading &&
                        !error &&
                        pdfDocument && (

                            <div
                                className={`pdf-viewer-pages ${viewMode === 'two'
                                        ? 'two-page'
                                        : 'single-page'
                                    }`}
                            >

                                {Array.from(
                                    {
                                        length: pageCount
                                    },
                                    (_, index) => {

                                        const pageNumber =
                                            index + 1;

                                        return (
                                            <div
                                                key={pageNumber}
                                                ref={(element) => {
                                                    pageRefs.current[index] =
                                                        element;
                                                }}
                                                className="pdf-page-wrapper"
                                            >

                                                <canvas
                                                    ref={(element) => {
                                                        canvasRefs.current[index] =
                                                            element;
                                                    }}
                                                    className="pdf-page-canvas"
                                                />

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}

export default PDFViewer;