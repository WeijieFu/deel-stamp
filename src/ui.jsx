import {
  Button,
  Container,
  render,
  TextboxMultiline,
  useInitialFocus,
  VerticalSpace,
} from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useState } from "preact/hooks"

import styles from "./styles.css"
function Plugin({ log }) {
  return (
    <Container space='medium'>
      <VerticalSpace space='medium' />
      <div class={styles.header}>
        <span class={styles.status}>Change To</span>
        <span class={styles.date}>On</span>
        <span class={styles.name}>By</span>
      </div>
      {log.map((item, index) => {
        return (
          <div class={styles.row}>
            <span class={styles.status}>{item.value}</span>
            <span class={styles.date}>{item.date}</span>
            <span class={styles.name}>{item.name}</span>
          </div>
        )
      })}
      <VerticalSpace space='medium' />
    </Container>
  )
}

export default render(Plugin)
