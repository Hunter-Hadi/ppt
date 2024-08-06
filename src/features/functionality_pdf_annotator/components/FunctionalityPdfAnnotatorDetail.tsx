import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box, Button } from "@mui/material";
import { PDFDocument } from "pdf-lib";
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { useRecoilValue } from "recoil";

import FunctionalityCommonOperatePdfToolViewMain from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperatePdfToolViewMain";
import useFunctionalityEditDndContextHandle from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/hooks/useFunctionalityEditDndContextHandle";
import { fabricCanvasJsonStringListRecoil } from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas";
import { textAnnotatorRecoilList } from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setTextContentAnnotator";
import { pdfLibFabricCanvasEmbedSave } from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/pdfLibFabricCanvasEmbedSave";
import { textContentHighlighterPdfLibEmbedSave } from "@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/TextContentHighlighter/pdfLibEmbedSave";
import { downloadUrl } from "@/features/functionality_common/utils/functionalityCommonDownload";

import FunctionalityPdfAnnotatorOperationAreaInsertTools from "./FunctionalityPdfAnnotatorOperationAreaInsertTools";
export interface IFunctionalityPdfAnnotatorDetailHandles {}
interface IFunctionalityPdfAnnotatorDetailProps {
  file: File;
  onClearFile: () => void;
}
const FunctionalityPdfAnnotatorDetail: ForwardRefRenderFunction<
  IFunctionalityPdfAnnotatorDetailHandles,
  IFunctionalityPdfAnnotatorDetailProps
> = ({ file, onClearFile }) => {
  const [editType, setEditType] = React.useState<"annotator" | "insert">(
    "annotator"
  );
  const textAnnotatorList = useRecoilValue(textAnnotatorRecoilList);
  const fabricCanvasJsonStringList = useRecoilValue(
    fabricCanvasJsonStringListRecoil
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(KeyboardSensor)
  );
  const {
    activeData,
    onDragStart,
    onDragEnd,
  } = useFunctionalityEditDndContextHandle({
    onStart: () => {},
    onEnd: () => {},
  });
  const onSave = async () => {
    console.log("textAnnotatorList", textAnnotatorList);
    let pdfDoc: PDFDocument | null = null;
    try {
      const fileBuffer = await file.arrayBuffer();
      pdfDoc = await PDFDocument.load(fileBuffer);
    } catch (error) {
      console.error("Error loading PDF Document:", error);
      return;
    }
    await textContentHighlighterPdfLibEmbedSave(pdfDoc, textAnnotatorList);
    await pdfLibFabricCanvasEmbedSave(pdfDoc, fabricCanvasJsonStringList);
    pdfDoc.save().then((blob) => {
      downloadUrl(blob, "newFileName.pdf");
    });
  };
  return (
    <Box>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <FunctionalityPdfAnnotatorOperationAreaInsertTools
          editType={editType}
          onChangeType={(type) => {
            if (type) {
              setEditType(type);
              return;
            }
            setEditType(editType === "insert" ? "annotator" : "insert");
          }}
        >
          <Button variant="contained" onClick={onSave}>
            你好，我要保存
          </Button>
        </FunctionalityPdfAnnotatorOperationAreaInsertTools>
        <Box
          sx={{
            width: 1000,
            height: 500,
          }}
        >
          <FunctionalityCommonOperatePdfToolViewMain
            file={file}
            isShowBottomOperation={true}
            currentEditType={editType}
          />
        </Box>

        {activeData && (
          <DragOverlay
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "grabbing",
              justifyContent: "center",
              width: activeData.width + 8,
              height: activeData.height + 8,
            }}
          >
            <Box
              id="pdf-text-drag-overlay"
              sx={{
                margin: "5px",
                border: "1px dashed #9065B0",
                width: "calc(100% - 10px)",
                height: "100%",
              }}
            ></Box>
          </DragOverlay>
        )}
      </DndContext>
    </Box>
  );
};
export default forwardRef(FunctionalityPdfAnnotatorDetail);
